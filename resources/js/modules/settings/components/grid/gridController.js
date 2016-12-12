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
        
        this._isGridRendered = false;

        this._view = new gridView();
        
        this._init();
        this._bindEvents();
    };
 
    gridController.prototype = Object.create(BaseController.prototype);
    
    gridController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    gridController.prototype._init = function() {
    };
    
    gridController.prototype._onViewRendered = function() {
        this._isGridRendered = true;
    };

    gridController.prototype.showGrid = function() {
        var layout = this._parentView;
        if (!this._isGridRendered) {
            layout.showChildView('gridRegion', this.getView());
        }
        else {
            this.renderView();
        }
    };

    gridController.prototype.renderView = function() {
        this.getView().render();
    };

    return gridController;
});