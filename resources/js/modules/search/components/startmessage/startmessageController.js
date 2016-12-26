"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    './views/startmessageView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    startMessageView
) {
    var startmessageController = function(poConf) {
        
        var loConf = poConf || {};
        
        this._parentView = loConf.parentView || {};
        
        BaseController.call(this);

        this._view = new startMessageView();
        
        this._init();
        this._bindEvents();
    };
 
    startmessageController.prototype = Object.create(BaseController.prototype);
    
    startmessageController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    startmessageController.prototype._init = function() {
    };
    
    startmessageController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    startmessageController.prototype.showStartMessage = function() {
        this._parentView.showChildView('startRegion', this.getView());
    };

    startmessageController.prototype.renderView = function() {
        this.getView().render();
    };

    return startmessageController;
});