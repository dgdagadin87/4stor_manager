"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    'common/components/header/views/headerView',
    'common/components/header/models/headerModel'
], function (
    _,
    Backbone,
    $,
    Application,
    headerView,
    headerModel
) {
    var headerController = function() {
        this._bindEvents();
        this._init();
    };
    
    headerController.prototype._bindEvents = function() {
        Application.on('header:init', this._onViewInitialized());
        Application.on('header:render', this._onViewRendered.bind(this));
    };
    
    headerController.prototype._init = function() {
        this._model = new headerModel();
        this._view = new headerView();
        
        this._view.model = this._model;
    };
    
    headerController.prototype._onViewInitialized = function() {
        console.log('header view initialized');
    };
    
    headerController.prototype._onViewRendered = function() {
        console.log('header view rendered');
    };
    
    headerController.prototype.renderView = function() {
        this.getView().render();
    };
    
    headerController.prototype.getView = function() {
        return this._view;
    };
    
    headerController.prototype.getModel = function() {
        return this._model;
    };

    return headerController;
});