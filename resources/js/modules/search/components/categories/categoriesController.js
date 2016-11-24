"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'modules/search/components/categories/views/categoriesView',
    'modules/search/components/categories/models/categoriesModel'
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
        
        var mainLayout = Application.getMailLayout();
        var commonData = mainLayout.getCommonData();
        var categories = commonData.categories || [];
        var checkedIds = [];
        _.each(categories, function(category){
            checkedIds.push(category.catId);
        });
        
        this._model = new categoriesModel();
        this._model.set('checkedCategories', checkedIds);
        
        BaseController.call(this);

        this._init();
        this._bindEvents();
    };
 
    categoriesController.prototype = Object.create(BaseController.prototype);
    
    categoriesController.prototype._bindEvents = function() {
    };
    
    categoriesController.prototype._init = function() {
    };
    
    categoriesController.prototype.getViewForDialog = function() {
        this._view = new categoriesView();
        this._view.model = this._model;
        return this._view;
    };

    categoriesController.prototype.getModel = function() {
        return this._model;
    };

    return categoriesController;
});