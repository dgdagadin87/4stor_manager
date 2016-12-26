"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    'modules/settings/models/settingsStateModel',
    'modules/settings/components/grid/models/gridModel',
    '_base/BaseModule',
    'modules/settings/views/settingsView',
    'common/components/paging/pagingController',
    'modules/settings/components/grid/gridController',
    'modules/settings/components/toolbar/toolbarController',
    'common/dialogs/linkform/linkformController'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    metaModel,
    dataModel,
    BaseModule,
    settingsView,
    pagingController,
    gridController,
    toolbarController,
    formController
) {
    var settingsController = function(poConfig) {

        BaseModule.call(this);

        this._moduleCode = 'settings';

        this._meta = new metaModel();
        this._data = new dataModel();

        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;

        this._pageTitle = 'Настройки';

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

        this._toolbarComponent = new toolbarController({
            parentView: this._view
        });
        this._gridComponent = new gridController({
            parentView: this._view
        });
        this._pagingComponent = new pagingController({
            parentView  : this._view,
            regionName  : 'pagingRegion',
            eventPrefix : 'synclinks'
        });
        this._formComponent = new formController();

        this._init();
        this._bindEvents();
    };

    settingsController.prototype = Object.create(BaseModule.prototype);
    
    settingsController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        this._meta.on('change', this._onMetaChanged.bind(this));
        Application.on('synclinks:refresh', this._onRefresh.bind(this));
        Application.on('synclinks:page:change', this._onSettingsPageChange.bind(this));
        Application.on('linkform:dialog:open', this._onModalFormOpen.bind(this));
    };
    
    settingsController.prototype._init = function() {
    };
    
    settingsController.prototype._onModalFormOpen = function(data, mode) {
        this._prepareData(data);
        var formView = this._formComponent.getViewForDialog(this._data, mode);
        Application.getMainLayout().getView()['dialogFrmRegion'].show(formView);
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
        this.setComponentRendered(true);
        this._renderComponents();
    };

    settingsController.prototype.showCurrentContent = function() {
        if (this._isGlobalLoading === true) {
            this.__renderSpinner();
            return false;
        }
        
        if (!this._isDataLoaded) {
            this._isGlobalLoading = true;
            this.__renderSpinner();
            
            CoreUtils.ajaxQuery({
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
        Application.trigger('synclinks:page:disable');
        
        CoreUtils.ajaxQuery({
            url: Settings.url.getLinksData,
            data: {
                page: this._meta.get('page')
            }
        },
        {
            afterSuccess: this._afterSuccess.bind(this),
            afterError: this._afterError.bind(this)
        },
        {
            afterSuccess: {
                isLoad: true
            }
        });
    };
    
    settingsController.prototype._afterSuccess = function(data) {
        var me = this;
        var laData = data.data || [];
        var linksData = laData.links || [];
        var pagingData = laData.paging || {};
        var lbSuccess = data.success || false;
        var lsMessage = data.message || '';
        
        var params = arguments[3] || {};
        var isDataLoad = params['isLoad'] || false;
        
        if (!isDataLoad) {
            me._isGlobalLoading = false;
        }

        if (isDataLoad) {
            Application.trigger('synclinks:page:enable');
        }

        if (!lbSuccess) {
            if (!isDataLoad) {
                me.__showGlobalError(lsMessage);
            }
        }
        else {
            me._isDataLoaded = true;
            me._gridComponent.setData(linksData);
            me._pagingComponent.setData(pagingData);
            me._renderFunction();
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
        if (!this.isComponentRendered()) {
            mainLayout.getView()[this._regionName].show(this.getView());
        }
        else {
            this._renderComponents();
        }
    };
    
    settingsController.prototype._renderComponents = function() {
        this._toolbarComponent.showToolbar();
        this._gridComponent.showGrid();
        this._pagingComponent.showPaging();
    };

    settingsController.prototype.renderView = function() {
        this.getView().render();
    };
    
    settingsController.prototype._prepareData = function(data) {
        this._data.set(data);
    };

    return settingsController;
});