"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    './views/categoriesView',
    './models/categoriesModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    categoriesView,
    categoriesModel
) {
    var categoriesController = function() {
        
        this._model = new categoriesModel();
        
        BaseController.call(this);

        this._init();
        this._bindEvents();
    };
 
    categoriesController.prototype = Object.create(BaseController.prototype);
    
    categoriesController.prototype._bindEvents = function() {
    };
    
    categoriesController.prototype._init = function() {
    };
    
    categoriesController.prototype.setCategoriesData = function() {
        var mainLayout = Application.getMainLayout();
        var commonData = mainLayout.getCommonData();
        var categories = commonData.categories || [];
        var checkedIds = [];
        _.each(categories, function(category){
            checkedIds.push(category.categoryId);
        });
        this._model.set('checkedCategories', checkedIds);
    };
    
    categoriesController.prototype.getViewForDialog = function() {
        if (this._view) {
            this._view.destroy();
        }
        this._view = new categoriesView();
        this._view.model = this._model;
        return this._view;
    };

    categoriesController.prototype.getModel = function() {
        return this._model;
    };

    return categoriesController;
});