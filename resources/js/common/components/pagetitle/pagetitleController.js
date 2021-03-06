"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'common/components/pagetitle/views/pagetitleView',
    'common/components/pagetitle/models/pagetitleModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    pagetitleView,
    pagetitleModel
) {
    var pagetitleController = function() {
        
        BaseController.call(this);

        this._model = new pagetitleModel();
        this._view = new pagetitleView();
        
        this._init();
        this._bindEvents();
    };
    
    pagetitleController.prototype = Object.create(BaseController.prototype);
    
    pagetitleController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    pagetitleController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    pagetitleController.prototype._onViewRendered = function() {
        if (!this.isComponentRendered()) {
            this.setComponentRendered(true);
        }
    };

    pagetitleController.prototype.renderView = function() {
        this.getView().render();
    };
    
    pagetitleController.prototype.showPageTitle = function(psTitle, psCode) {
        var mainLayout = Application.getMainLayout();
        var view = this.getView();
        var code = psCode || '';
        var title = psTitle || '';
        this.getModel().set({
            'pageCode': code,
            'pageTitle': title
        });
        if (!this.isComponentRendered()) {
            mainLayout._regionManager.showRegionByName('pagetitleRegion');
            mainLayout.getView()['pagetitleRegion'].show(view);
        }
        else {
            this.renderView();
        }
    };
    
    pagetitleController.prototype.getModel = function() {
        return this._model;
    };

    return pagetitleController;
});