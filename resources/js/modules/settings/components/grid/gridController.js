"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'modules/settings/components/grid/views/gridView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    gridView
) {
    var gridController = function(poConfig) {
        
        BaseController.call(this);
        
        var loConfig = poConfig || {};
        this._parentView = loConfig.parentView || {};

        this._view = new gridView();
        
        this._init();
        this._bindEvents();
    };
 
    gridController.prototype = Object.create(BaseController.prototype);
    
    gridController.prototype._bindEvents = function() {
        var me= this;
        this._view.on('render', this._onViewRendered.bind(this));
        Application.on('synclinks:controls:disable', function(){
            me._view.$('.grid-for-disabled').addClass('grid-disabled');
        });
        Application.on('synclinks:controls:enable', function(){
            me._view.$('.grid-for-disabled').addClass('grid-disabled');
        });
    };
    
    gridController.prototype._init = function() {
    };
    
    gridController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    gridController.prototype.showGrid = function() {
        var layout = this._parentView;
        if (!this.isComponentRendered()) {
            layout.showChildView('gridRegion', this.getView());
        }
        else {
            this.renderView();
        }
    };
    
    gridController.prototype.setData = function(data) {
        this.getView().collection.set(data);
    };

    gridController.prototype.renderView = function() {
        this.getView().render();
    };

    return gridController;
});