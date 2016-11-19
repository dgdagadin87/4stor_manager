"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    'modules/search/models/searchStateModel',
    'modules/search/models/searchDataModel',
    'common/components/storlist/storlistController',
    'common/components/paging/pagingController',
    'common/components/listbar/listbarController',
    'modules/search/components//startmessage/startmessageController',
    'modules/search/components/searchform/searchformController',
    'modules/search/views/searchView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    metaModel,
    dataModel,
    storlistController,
    pagingController,
    listbarController,
    startMessageController,
    searchFormController,
    searchView
) {
    var searchController = function(poConfig) {

        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseController.call(this);
        
        this._meta = new metaModel();
        this._data = new dataModel();
        
        this._pageTitle = 'Поиск по историям';
        
        this._isSearchRendered = false;
        this._breadCrumbs = [
            {
                isMain: true,
                name: 'Главная страница',
                url: ''
            },
            {
                isMain: false,
                name: 'Поиск по историям',
                url: 'search'
            }
        ];

        this._view = new searchView();
        
        this._startMessageComponent = new startMessageController({
            parentView: this._view
        });
        this._searchFormComponent = new searchFormController({
            parentView: this._view,
            regionName: 'searchformRegion',
            eventPrefix: 'search'
        });
        this._toolbarComponent = new listbarController({
            parentView: this._view,
            regionName: 'toolbarRegion',
            toScrollId: 'searchListRegion'
        });
        this._listComponent = new storlistController({
            parentView: this._view,
            regionName: 'storlistRegion',
            toScrollId: 'searchListRegion'
        });
        this._pagingComponent = new pagingController({
            parentView  : this._view,
            regionName  : 'pagingRegion',
            eventPrefix : 'search'
        });
        
        this._init();
        this._bindEvents();
    };
 
    searchController.prototype = Object.create(BaseController.prototype);
    
    searchController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        this._meta.on('change', this._onMetaChanged.bind(this));
        Application.on('search:page:change', this._onCategoryPageChange.bind(this));
        Application.on('search:sort:change', this._onCategorySortChange.bind(this));
    };
    
    searchController.prototype._init = function() {
        this._metaDefault = {
            page: 1,
            sortBy: 'storDate',
            sortType: 'DESC'
        };
    };
    
    searchController.prototype._onMetaChanged = function() {
        this.loadData();
    };
    
    searchController.prototype._onCategoryPageChange = function(page) {
        this._meta.set('page', page);
    };
    
    searchController.prototype._onCategorySortChange = function(data) {
        var loData = data || {};
        loData.page = 1;
        this._meta.set(loData);
    };
    
    searchController.prototype.loadData = function() {
        
    };
    
    searchController.prototype._onViewRendered = function() {
        this._isSearchRendered = true;
        this._renderBaseComponents();
    };
    
    searchController.prototype.showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender = function(){
            me.__renderContent();
            if (!me._isSearchRendered) {
                layoutView[me._regionName].show(me.getView());
            }
        };
        lfRender();
    };
    
    searchController.prototype._renderBaseComponents = function() {
        this._searchFormComponent.showSearchForm();
        this._startMessageComponent.showStartMessage();
    };

    searchController.prototype._showCurrentContent = function() {
        
    };

    searchController.prototype.renderView = function() {
        this.getView().render();
    };

    searchController.prototype.afterError = function(data) {
        var lsMessage = data.message || '';
        this._isGlobalLoading = false;
        Application.trigger('error:modal:show', lsMessage);
    };
    
    searchController.prototype.getModel = function() {
        return this._model;
    };

   return searchController;
});