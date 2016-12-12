"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'modules/settings/components/form/models/formModel',
    'modules/settings/components/form/models/formStateModel',
    'modules/settings/components/form/views/formView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    formModel,
    stateModel,
    formView
) {
    var formController = function(poConfig) {
        
        BaseController.call(this);
        
        var loConfig = poConfig || {};
        this._parentView = loConfig.parentView || {};
        
        this._isFormRendered = false;

        this._model = new formModel();
        this._state = new stateModel();

        this._view = new formView();
        
        this._init();
        this._bindEvents();
    };
 
    formController.prototype = Object.create(BaseController.prototype);
    
    formController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    formController.prototype._init = function() {
        this._view.model = this._model;
        this._view.state = this._state;
    };
    
    formController.prototype._onViewRendered = function() {
        this._isFormRendered = true;
    };

    formController.prototype.showForm = function() {
        var layout = this._parentView;
        if (!this._isFormRendered) {
            layout.showChildView('formRegion', this.getView());
        }
        else {
            this.renderView();
        }
    };

    formController.prototype.renderView = function() {
        this.getView().render();
    };
    
    formController.prototype.getModel = function() {
        return this._model;
    };

    return formController;
});