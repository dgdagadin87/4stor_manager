"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'common/components/spinner/views/spinnerView',
    'common/components/spinner/models/spinnerModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    spinnerView,
    spinnerModel
) {
    var spinnerController = function() {
        
        BaseController.call(this);
        
        this._model = new spinnerModel();
        this._view = new spinnerView();
        
        this._init();
        this._bindEvents();
    };
    
    spinnerController.prototype = Object.create(BaseController.prototype);
    
    spinnerController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    spinnerController.prototype._init = function() {
        this._view.model = this.model;
    };
    
    spinnerController.prototype._onViewRendered = function() {
        console.log('spinner is rendered');
    };

    spinnerController.prototype.renderView = function() {
        this.getView().render();
    };

    return spinnerController;
});