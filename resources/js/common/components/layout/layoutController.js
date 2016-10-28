"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    'common/components/layout/views/layoutView',
    'common/components/header/headerController'
], function (
    _,
    Backbone,
    $,
    Application,
    mainLayoutView,
    headerComponent
) {
    var layoutController = function() {
        
        this._view = new mainLayoutView();
        
        this._headerComponent = new headerComponent();
        
        this._init();
        this._bindEvents();
    };
    
    layoutController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    layoutController.prototype._init = function() {
    };
    
    layoutController.prototype._onViewRendered = function() {
        this._view._isViewRendered = true;
        this._view.showChildView('headerRegion', this._headerComponent.getView());
    };
    
    layoutController.prototype.renderView = function() {
        if (!this._view._isViewRendered) {
            this.getView().render();
        }
    };
    
    layoutController.prototype.showIndex = function() {
        this.renderView();
    };
    layoutController.prototype.showSearch = function() {
        this.renderView();
    };
    layoutController.prototype.showSettings = function() {
        this.renderView();
    };
    
    layoutController.prototype.getView = function() {
        return this._view;
    };

    return layoutController;
});