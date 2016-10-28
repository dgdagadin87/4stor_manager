"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'common/components/header/views/headerView',
    'common/components/header/models/headerModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
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
        console.log('header view was initialized');
    };
    
    headerController.prototype._onViewRendered = function() {
        var params = CoreUtils.getURIParams();
        var rootParam = params[0] || 'main';
        this._setActiveHeader(rootParam);
    };
    
    headerController.prototype.renderView = function() {
        this.getView().render();
    };
    
    headerController.prototype._setActiveHeader = function(psParam) {
        var classes = ['main', 'search', 'settings'];
        var headerClass = classes.indexOf(psParam) !== -1 ? psParam : 'main';
        this._view.$('.'+headerClass).addClass('active');
    };
    
    headerController.prototype.getView = function() {
        return this._view;
    };
    
    headerController.prototype.getModel = function() {
        return this._model;
    };

    return headerController;
});