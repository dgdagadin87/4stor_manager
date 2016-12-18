"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    './views/linkformView',
    './models/stateModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    formView,
    stateModel
) {
    var formController = function() {
        
        BaseController.call(this);

        this._state = new stateModel;

        this._init();
        this._bindEvents();
    };
 
    formController.prototype = Object.create(BaseController.prototype);
    
    formController.prototype._bindEvents = function() {
    };
    
    formController.prototype._init = function() {
    };
    
    formController.prototype._onViewRendered = function() {
    };

    formController.prototype.getViewForDialog = function(model, mode) {
        if (!_.isEmpty(this._view)) {
            this._view.destroy();
        }
        this._view = new formView();
        this._model = model;
        this._view.model = this._model;
        this._view.state = this._state;
        var title = (mode === 'add' ? 'Добавить' : 'Редактировать') + ' ссылку';
        var submit = mode === 'add' ? 'Добавить' : 'Редактировать';
        this._state.set({
            title: title,
            submit: submit
        });
        return this._view;
    };

    return formController;
});