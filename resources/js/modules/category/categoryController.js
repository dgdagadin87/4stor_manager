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
    'common/components/listbar/listbarController',
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
    listbarController,
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
        
        
        this._toolbarComponent = new listbarController({
            parentView: this._view,
            regionName: 'toolbarRegion',
            toScrollId: 'categoryListRegion'
        });
        this._listComponent = new storlistController({
            parentView: this._view,
            regionName: 'storlistRegion',
            toScrollId: 'categoryListRegion'
        });
        this._pagingComponent = new pagingController({
            parentView  : this._view,
            regionName  : 'pagingRegion',
            eventPrefix : 'category'
        });
        
        this._init();
        this._bindEvents();
    };
 
    categoryController.prototype = Object.create(BaseController.prototype);
    
    categoryController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        this._meta.on('change', this._onMetaChanged.bind(this));
        Application.on('category:page:change', this._onCategoryPageChange.bind(this));
        Application.on('category:sort:change', this._onCategorySortChange.bind(this));
    };
    
    categoryController.prototype._init = function() {
        this._metaDefault = {
            page: 1,
            sortBy: 'storDate',
            sortType: 'DESC'
        };
    };
    
    categoryController.prototype._onMetaChanged = function() {
        this.loadData();
    };
    
    categoryController.prototype._onCategoryPageChange = function(page) {
        this._meta.set('page', page);
    };
    
    categoryController.prototype._onCategorySortChange = function(data) {
        var loData = data || {};
        loData.page = 1;
        this._meta.set(loData);
    };
    
    categoryController.prototype.loadData = function() {
        var me = this;
        var lfRender = function(){
            Application.trigger('title:change', me._pageTitle);
            me._renderComponents({
                toScroll: true
            });
        };
        var afterSuccess = function(data) {
            var laData = data.data || [];
            var categoryData = laData.category || [];
            var catName = laData.categoryName || '';
            var pagingData = laData.paging || {};
            var metaData = laData.meta || {};
            var lbSuccess = data.success || false;
            var lsMessage = data.message || '';
            
            if (!lbSuccess) {
                Application.trigger('error:modal:show', lsMessage);
            }
            else {
                me._categoryName = catName;
                me._pageTitle = 'Категория "'+me._categoryName+'"';
                if (pagingData._currentPage > 1) {
                    me._pageTitle += ' (страница '+pagingData._currentPage+')';
                }

                me._listComponent.setData(categoryData);
                me._pagingComponent.setData(pagingData);
                me._toolbarComponent.setData(metaData);

                lfRender();
            }
        };
        
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
            afterError: me.afterError
        });
    };
    
    categoryController.prototype._onViewRendered = function() {
        this._isCategoryRendered = true;
        this._renderComponents();
    };
    
    categoryController.prototype.showCurrentContent = function(poParams) {
        var catId = poParams.categoryId || 0;
        if (catId !== this._categoryId) {
            this._meta.set(this._metaDefault, {
                silent: true
            });
            this._categoryId = catId;
            this._showCurrentContent();
        }
        else {
            this.__renderContent();
        }
    };
    
    categoryController.prototype._renderComponents = function() {
        var config = arguments[0] || {};
        var toScroll = config.toScroll;
        this._listComponent.showStorList(toScroll);
        this._pagingComponent.showPaging();
        this._toolbarComponent.showToolbar();
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
            var metaData = laData.meta || {};
            var lbSuccess = data.success || false;
            var lsMessage = data.message || '';
            
            me._isGlobalLoading = false;
            $('.catlist-for-disabled').removeClass('catlist-disabled');
            
            if (!lbSuccess) {
                Application.trigger('error:modal:show', lsMessage);
            }
            else {
                me._breadCrumbs = breadCrumbsData;
                me._categoryName = catName;
                me._pageTitle = 'Категория "'+me._categoryName+'"';

                me._listComponent.setData(categoryData);
                me._pagingComponent.setData(pagingData);
                me._toolbarComponent.setData(metaData);

                lfRender();
            }
        };
        
        this._isGlobalLoading = true;
        $('.catlist-for-disabled').addClass('catlist-disabled');
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
            afterError: me.afterError
        });
    };

    categoryController.prototype.renderView = function() {
        this.getView().render();
    };

    categoryController.prototype.afterError = function(data) {
        var lsMessage = data.message || '';
        this._isGlobalLoading = false;
        Application.trigger('error:modal:show', lsMessage);
    };
    
    categoryController.prototype.getModel = function() {
        return this._model;
    };

   return categoryController;
});