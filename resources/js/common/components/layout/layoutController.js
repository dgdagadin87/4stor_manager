"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    'common/components/layout/views/layoutView'
], function (
    _,
    Backbone,
    $,
    Application,
    mainLayoutView
) {
    var layoutController = function() {
        this._bindEvents();
        this._init();
    };
    
    layoutController.prototype._bindEvents = function() {
        Application.on('mainlayout:init', this._onViewInitialized.bind(this));
    };
    
    layoutController.prototype._init = function() {
        this._view = new mainLayoutView();
    };
    
    layoutController.prototype._onViewInitialized = function() {
        console.log('main view initialized');
    };
    
    layoutController.prototype.renderView = function() {
        this.getView().render();
    };
    
    layoutController.prototype.getView = function() {
        return this._view;
    };

    return layoutController;
});