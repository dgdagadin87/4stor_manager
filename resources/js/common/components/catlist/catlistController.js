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
    
    catlistController.prototype.showCategoryList = function() {
        if (!this._isCategoriesRendered) {
            var me = this;
            var view = me.getView();
            var beforeSend = function() {
                Application.trigger('spinner:small:show');
            };
            var afterSuccess = function(data) {
                var laData = data.data || [];
                var lbSuccess = data.success || false;
                var lsMessage = data.message || '';
                if (!lbSuccess) {
                    Application.trigger('error:modal:show', lsMessage);
                }
                else {
                    var mainLayout = Application.getMainLayout();
                    view.collection.set(laData);
                    mainLayout.getView().showChildView('leftRegion', view);
                }
            };
            var afterError = function() {
                Application.trigger('error:modal:show', 'На сервере какая-то ошибка');
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
        }
    };

    return catlistController;
});