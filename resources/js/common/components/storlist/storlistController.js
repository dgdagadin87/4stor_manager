"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    'common/components/storlist/views/storlistView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    storlistView
) {
    var storlistController = function(poConfig) {
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        this._parentView = loConfig.parentView;
        this._toScrollId = loConfig.toScrollId;
        this._eventPrefix = loConfig.eventPrefix || 'category';
        
        BaseController.call(this);

        this._needScroll = false;

        this._view = new storlistView();
        
        this._init();
        this._bindEvents();
    };

    storlistController.prototype = Object.create(BaseController.prototype);
    
    storlistController.prototype._bindEvents = function() {
        var me = this;
        this._view.on('render', this._onViewRendered.bind(this));
        Application.on(me._eventPrefix+':loader:show', function(){
            CoreUtils.showListPreloader(me._view);
        });
        Application.on(me._eventPrefix+':loader:hide', function(){
            CoreUtils.hideListPreloader(me._view);
        });
    };
    
    storlistController.prototype._init = function() {
    };
    
    storlistController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
        if (this._needScroll) {
            CoreUtils.scrollToElement(this._toScrollId);
        }
    };

    storlistController.prototype.showStorList = function(pbToScroll) {
        
        if (pbToScroll) {
            this._needScroll = true;
        }
        else {
            this._needScroll = false;
        }
        
        if (!this.isComponentRendered()) {
            this._parentView[this._regionName].show(this.getView());
        }
        else {
            this.renderView();
        }
    };

    storlistController.prototype.renderView = function() {
        this.getView().render();
    };
    
    storlistController.prototype.setData = function(data) {
        this.getView().collection.set(data);
    };

    return storlistController;
});