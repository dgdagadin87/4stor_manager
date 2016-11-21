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
    var spinnerController = function(config) {
        
        BaseController.call(this);
        
        var loCfg = config || {};
        this._spinnerRegion = loCfg.spinnerRegion || 'spinnerRegion';
        this._outerSpinner = loCfg.outerSpinner || false;
        this._layout = loCfg.layout || {};
        
        this._model = new spinnerModel();
        
        this._view = new spinnerView();
        
        this._isSpinnerRendered = false;
        
        this._init();
        this._bindEvents();
    };
    
    spinnerController.prototype = Object.create(BaseController.prototype);
    
    spinnerController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    spinnerController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    spinnerController.prototype._onViewRendered = function() {
        this._isSpinnerRendered = true;
    };

    spinnerController.prototype.renderView = function() {
        this.getView().render();
    };
    
    spinnerController.prototype.showSpinner = function() {
        if (!this._outerSpinner) {
            var mainLayout = Application.getMainLayout();
            var regionManager = mainLayout._regionManager || {};
            var layoutView = mainLayout.getView();
            regionManager.prepareRegionForRender(this._spinnerRegion);
            regionManager.showRegionByName(this._spinnerRegion);
            layoutView[this._spinnerRegion].show(this.getView());
        }
        else {
            this._layout.getView()[this._spinnerRegion].$el.show();
            this._layout.getView()[this._spinnerRegion].show(this.getView())
        }
    };
    
    spinnerController.prototype.getModel = function() {
        return this._model;
    };

    return spinnerController;
});