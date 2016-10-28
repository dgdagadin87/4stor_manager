"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'common/components/crumbs/views/crumbsView',
    'common/components/crumbs/models/crumbsModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    crumbsView,
    crumbsModel
) {
    var crumbsController = function() {
        
        this._model = new crumbsModel();
        this._view = new crumbsView();
        
        this._init();
        this._bindEvents();
    };
    
    crumbsController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    crumbsController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    crumbsController.prototype._onViewRendered = function() {
        console.log('breadcrumbs were rendered');
    };

    crumbsController.prototype.renderView = function() {
        this.getView().render();
    };

    crumbsController.prototype.getView = function() {
        return this._view;
    };
    
    crumbsController.prototype.getModel = function() {
        return this._model;
    };

    return crumbsController;
});