"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'settings',
    'common/components/catlist/views/catlistView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    Settings,
    catlistView
) {
    var catlistController = function() {
        
        this._isCategoriesRendered = false;
        
        BaseController.call(this);

        this._view = new catlistView();
        
        this._init();
        this._bindEvents();
    };
    
    catlistController.prototype = Object.create(BaseController.prototype);
    
    catlistController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    catlistController.prototype._init = function() {
    };
    
    catlistController.prototype._onViewRendered = function() {
        this._isCategoriesRendered = true;
    };

    catlistController.prototype.renderView = function() {
        this.getView().render();
    };
    
    catlistController.prototype.showCategoryList = function(paData) {
        if (!this._isCategoriesRendered) {
            var view = this.getView();
            var mainLayout = Application.getMainLayout();
            view.collection.set(paData);
            mainLayout.getView().showChildView('leftRegion', view);
        }
    };

    return catlistController;
});