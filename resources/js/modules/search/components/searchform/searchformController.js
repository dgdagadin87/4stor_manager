"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    './views/searchformView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    searchformView
) {
    var searchformController = function(poConfig) {
        
        var loConfig = poConfig || {};

        BaseController.call(this);
        
        this._isSearchformRendered = false;

        this._regionName = loConfig.regionName || 'searchformRegion';
        this._parentView = loConfig.parentView || {};

        this._view = new searchformView();
        
        this._init();
        this._bindEvents();
    };
 
    searchformController.prototype = Object.create(BaseController.prototype);
    
    searchformController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    searchformController.prototype._init = function() {
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