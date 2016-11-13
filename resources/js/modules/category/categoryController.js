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
    'common/components/storlist/storlistController',
    'common/components/paging/pagingController',
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
    storlistController,
    pagingController,
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
        
        this._listComponent = new storlistController({
            parentView: this._view,
            regionName: 'storlistRegion'
        });
        this._pagingComponent = new pagingController({
            parentView: this._view,
            regionName: 'pagingRegion'
        });
        
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
        this._renderComponents();
    };
    
    categoryController.prototype.showCurrentContent = function(poParams) {
        var catId = poParams.categoryId || 0;
        if (catId !== this._categoryId) {
            this._categoryId = catId;
            this._showCurrentContent();
        }
        else {
            this.__renderContent();
        }
    };
    
    categoryController.prototype._renderComponents = function() {
        this._listComponent.showStorList();
        this._pagingComponent.showPaging();
    };

    categoryController.prototype._showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender = function(){

            me.__renderContent();

            if (!me._isCategoryRendered) {
                layoutView[me._regionName].show(me.getView());
            }
            else {
                me._renderComponents();
            }
        };

        if (me._isGlobalLoading === true) {
            me.__renderSpinner();
            return false;
        }

        var afterSuccess = function(data) {
            var laData = data.data || [];
            var categoryData = laData.category || [];
            var catName = laData.categoryName || '';
            var breadCrumbsData = laData.breadcrumbs || [];
            var pagingData = laData.paging || {};
            var lbSuccess = data.success || false;
            var lsMessage = data.message || '';
            
            me._isGlobalLoading = false;
            
            if (!lbSuccess) {
                Application.trigger('error:modal:show', lsMessage);
            }
            else {
                me._breadCrumbs = breadCrumbsData;
                me._categoryName = catName;
                me._pageTitle = 'Категория "'+me._categoryName+'"';

                me._listComponent.setData(categoryData);
                me._pagingComponent.setData(pagingData);

                lfRender();
            }
        };
        var afterError = function(data){
            var lsMessage = data.message || '';
            me._isGlobalLoading = false;
            Application.trigger('error:modal:show', lsMessage);
        };
        
        this._isGlobalLoading = true;
        this.__renderSpinner();
        
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