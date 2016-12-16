"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    'modules/settings/models/settingsStateModel',
    '_base/BaseController',
    'modules/settings/views/settingsView',
    'common/components/paging/pagingController',
    'modules/settings/components/grid/gridController'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    metaModel,
    BaseController,
    settingsView,
    pagingController,
    gridController
) {
    var settingsController = function(poConfig) {
        
        BaseController.call(this);
        
        this._meta = new metaModel();
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        this._isSettingsRendered = false;
        this._breadCrumbs = [
            {
                isMain: true,
                name: 'Главная страница',
                url: ''
            },
            {
                isMain: false,
                name: 'Настройки',
                url: 'settings'
            }
        ];
        
        this._pageMeta = {
            pageTitle: 'Настройки',
            pageCode: 'settings'
        };

        this._view = new settingsView();

        this._gridComponent = new gridController({
            parentView: this._view
        });
        this._pagingComponent = new pagingController({
            parentView  : this._view,
            regionName  : 'pagingRegion',
            eventPrefix : 'synclinks'
        });
        
        this._init();
        this._bindEvents();
    };
 
    settingsController.prototype = Object.create(BaseController.prototype);
    
    settingsController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        this._meta.on('change', this._onMetaChanged.bind(this));
        Application.on('settings:refresh', this._onRefresh.bind(this));
        Application.on('settings:page:change', this._onSettingsPageChange.bind(this));
    };
    
    settingsController.prototype._init = function() {
    };
    
    settingsController.prototype._onRefresh = function() {
        this.loadData();
    };
    
    settingsController.prototype._onMetaChanged = function() {
        this.loadData();
    };
    
    settingsController.prototype._onSettingsPageChange = function(page) {
        this._meta.set('page', page);
    };
    
    settingsController.prototype._onViewRendered = function() {
        this._isSettingsRendered = true;
        this._renderComponents();
    };

    settingsController.prototype.showCurrentContent = function() {
        if (!this._isDataLoaded) {
            this._isGlobalLoading = true;
            this.__renderSpinner();
            
            CoreUtils.axajQuery({
                url: Settings.url.getLinksData
            },
            {
                afterSuccess: this._afterSuccess.bind(this),
                afterError: this._afterError.bind(this)
            });
        }
        else {
            this._renderFunction();
        }
    };
    
    settingsController.prototype.loadData = function() {
    };
    
    settingsController.prototype._afterSuccess = function(data) {
        var me = this;
        var laData = data.data || [];
        var linksData = laData.links || [];
        var pagingData = laData.paging || {};
        var lbSuccess = data.success || false;
        var lsMessage = data.message || '';

        me._isGlobalLoading = false;

        if (!lbSuccess) {
            me.__showGlobalError(lsMessage);
        }
        else {
            me._isDataLoaded = true;
            this._gridComponent.setData(linksData);
            me._pagingComponent.setData(pagingData);
            this._renderFunction();
        }
    };
    
    settingsController.prototype._afterError = function(data) {
        var lsMessage = data.message || '';
        this._isGlobalLoading = false;
        Application.trigger('error:modal:show', lsMessage);
    };
    
    settingsController.prototype._renderFunction = function() {
        var mainLayout = Application.getMainLayout();
        this.__renderContent();
        if (!this._isSettingsRendered) {
            mainLayout.getView()[this._regionName].show(this.getView());
        }
        else {
            this._renderComponents();
        }
    };
    
    settingsController.prototype._renderComponents = function() {
        this._gridComponent.showGrid();
        this._pagingComponent.showPaging();
    };

    settingsController.prototype.renderView = function() {
        this.getView().render();
    };

    return settingsController;
});