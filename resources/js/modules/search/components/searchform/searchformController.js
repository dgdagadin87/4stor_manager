"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    './models/searchformModel',
    './views/searchformView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    searchformModel,
    searchformView
) {
    var searchformController = function(poConfig) {
        
        var loConfig = poConfig || {};

        BaseController.call(this);
        
        this._isSearchformRendered = false;

        this._regionName = loConfig.regionName || 'searchformRegion';
        this._parentView = loConfig.parentView || {};

        this._model = new searchformModel();

        this._view = new searchformView();
        
        this._init();
        this._bindEvents();
    };
 
    searchformController.prototype = Object.create(BaseController.prototype);
    
    searchformController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    searchformController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    searchformController.prototype._onSearchFormSubmit = function() {
        console.log('submit button clicked');
    };
    
    searchformController.prototype._onViewRendered = function() {
        this._isSearchformRendered = true;
    };

    searchformController.prototype.showSearchForm = function() {

        if (!this._isSearchformRendered) {
            this._parentView.showChildView(this._regionName, this._view);
        }
    };

    searchformController.prototype.renderView = function() {
        this.getView().render();
    };

    searchformController.prototype.getModel = function() {
        return this._model;
    };

    return searchformController;
});