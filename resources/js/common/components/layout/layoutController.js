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
        this._bindEvents();
        this._init();
    };
    
    layoutController.prototype._bindEvents = function() {
        Application.on('mainlayout:init', this._onViewInitialized.bind(this));
        Application.on('mainlayout:render', this._onViewRendered.bind(this));
    };
    
    layoutController.prototype._init = function() {
        this._view = new mainLayoutView();
    };
    
    layoutController.prototype._onViewInitialized = function() {
        this._headerComponent = new headerComponent();
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
    
    layoutController.prototype.getView = function() {
        return this._view;
    };

    return layoutController;
});