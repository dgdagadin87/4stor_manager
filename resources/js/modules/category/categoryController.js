"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    'modules/category/models/categoryStateModel',
    'modules/category/views/categoryView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    metaModel,
    categoryView
) {
    var categoryController = function(poConfig) {

        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseController.call(this);
        
        this._meta = new metaModel();
        
        this._categoryId = null;
        this._categoryName = null;
        
        this._isCategoryRendered = false;
        this._breadCrumbs = [];

        this._view = new categoryView();
        
        this._init();
        this._bindEvents();
    };
 
    categoryController.prototype = Object.create(BaseController.prototype);
    
    categoryController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        //this._meta.on('change', this._onMetaChanged.bind(this));
    };
    
    categoryController.prototype._init = function() {
    };
    
    categoryController.prototype._onViewRendered = function() {
        this._isCategoryRendered = true;
        
    };
    
    categoryController.prototype.showCurrentContent = function(poParams) {
        var catId = poParams.categoryId || 0;
        if (catId !== this._categoryId) {
            this._categoryId = catId;
            this._showCurrentContent();
        }
        else {
            Application.trigger('breadcrumbs:show', this._breadCrumbs);
            Application.trigger('title:change', 'Категория "'+this._categoryName+'"');
        }
    };
    
    categoryController.prototype._renderComponents = function() {
        
    };

    categoryController.prototype._showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender = function(){
            layoutView[me._regionName].show(me.getView(), {forceShow: true});
        };

        var afterSuccess = function(data) {
            var laData = data.data || [];
            var categoryData = laData.category || [];
            var catName = laData.categoryName || '';
            var breadCrumbsData = laData.breadcrumbs || [];
            var lbSuccess = data.success || false;
            var lsMessage = data.message || '';
            if (!lbSuccess) {
                Application.trigger('error:modal:show', lsMessage);
            }
            else {
                me._breadCrumbs = breadCrumbsData;
                me._categoryName = catName;
                Application.trigger('breadcrumbs:show', breadCrumbsData);
                Application.trigger('title:change', 'Категория "'+catName+'"');
                //me.getView().collection.set(indexData);
                lfRender();
            }
        };
        var afterError = function(data){
            var lsMessage = data.message || '';
            Application.trigger('error:modal:show', lsMessage);
        };
        Application.trigger('breadcrumbs:hide');
        Application.trigger('spinner:large:show', this._regionName, 'Идет загрузка данных...');
        CoreUtils.axajQuery({
            url: Settings.url.getCategoryData,
            data: {
                catId   : me._categoryId,
                page    : me._meta.get('page'),
                sortBy  : me._meta.get('sortBy'),
                sortType: me._meta.get('sortType')
            }
        },
        {
            afterSuccess: afterSuccess,
            afterError: afterError
        });
    };

    categoryController.prototype.renderView = function() {
        this.getView().render();
    };
    
    categoryController.prototype.getModel = function() {
        return this._model;
    };

   return categoryController;
});