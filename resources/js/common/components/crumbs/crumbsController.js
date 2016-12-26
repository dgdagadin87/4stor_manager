"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'common/components/crumbs/views/crumbsView',
    'common/components/crumbs/models/crumbsModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    crumbsView,
    crumbsModel
) {
    var crumbsController = function() {
        
        BaseController.call(this);
        
        this._model = new crumbsModel();
        this._view = new crumbsView();
        
        this._init();
        this._bindEvents();
    };
    
    crumbsController.prototype = Object.create(BaseController.prototype);
    
    crumbsController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    crumbsController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    crumbsController.prototype._onViewRendered = function() {
        if (!this.isComponentRendered()) {
            this.setComponentRendered(true);
        }
    };

    crumbsController.prototype.renderView = function() {
        this.getView().render();
    };
    
    crumbsController.prototype.showBreadCrumbs = function(paData) {
        //if (!this.isComponentRendered()) {
            var mainLayout = Application.getMainLayout();
            var view = this.getView();
            view.collection.set(paData);
            mainLayout._regionManager.showRegionByName('crumbsRegion');
            mainLayout.getView()['crumbsRegion'].show(view);
        //}
        // {
        //    this.renderView();
        //}
    };
    
    crumbsController.prototype.hideBreadCrumbs = function() {
        var mainLayout = Application.getMainLayout();
        mainLayout._regionManager.hideRegionByName('crumbsRegion');
    };
    
    crumbsController.prototype.getModel = function() {
        return this._model;
    };

    return crumbsController;
});