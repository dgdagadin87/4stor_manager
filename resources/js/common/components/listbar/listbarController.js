"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    'common/components/listbar/models/listbarModel',
    'common/components/listbar/views/listbarView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    listbarModel,
    listbarView
) {
    var listbarController = function(poConfig) {
        
        var loConfig = poConfig || {};

        BaseController.call(this);

        this._regionName = loConfig.regionName || 'listbarRegion';
        this._parentView = loConfig.parentView || {};
        this._eventPrefix = loConfig.eventPrefix || 'category';

        this._model = new listbarModel();
        
        this._view = new listbarView();
        this._view.eventPrefix = this._eventPrefix;
        
        this._init();
        this._bindEvents();
    };
 
    listbarController.prototype = Object.create(BaseController.prototype);
    
    listbarController.prototype._bindEvents = function() {
        var me = this;
        this._view.on('render', this._onViewRendered.bind(this));
        Application.on(me._eventPrefix+':listbar:disable', function(){
            me._view.$('.listbar-for-disabled').addClass('listbar-disabled');
        });
        Application.on(me._eventPrefix+':listbar:ensable', function(){
            me._view.$('.listbar-for-disabled').removeClass('listbar-disabled');
        });
    };
    
    listbarController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    listbarController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    listbarController.prototype.setData = function(poConf) {
        var loConf = poConf || {};
        this._model.set(loConf);
    };

    listbarController.prototype.showToolbar = function() {

        if (!this.isComponentRendered()) {
            this._parentView.showChildView(this._regionName, this._view);
        }
        else {
            this.renderView();
        }
    };

    listbarController.prototype.renderView = function() {
        this.getView().render();
    };

    listbarController.prototype.getModel = function() {
        return this._model;
    };

    return listbarController;
});