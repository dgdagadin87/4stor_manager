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
    };

    catlistController.prototype.renderView = function() {
        this.getView().render();
    };
    
    catlistController.prototype.showCategoryList = function() {
        var me = this;
        var view = me.getView();
        var beforeSend = function() {
            Application.trigger('spinner:small:show');
        };
        var afterSuccess = function(data) {
            var mainLayout = Application.getMainLayout();
            view.collection.set(data);
            mainLayout.getView().showChildView('leftRegion', view);
        };
        var afterError = function() {
            alert('На сервере какая-то ошибка');
        };
        var loCfg = {
            url: Settings.url.getCategories
        };
        var functions = {
            beforeSend: beforeSend,
            afterSuccess: afterSuccess,
            afterError: afterError
        };
        CoreUtils.axajQuery(loCfg, functions);
    };

    return catlistController;
});