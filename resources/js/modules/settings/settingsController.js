"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'modules/settings/views/settingsView',
    'modules/settings/components/form/formController',
    'modules/settings/components/grid/gridController'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    settingsView,
    formController,
    gridController
) {
    var settingsController = function(poConfig) {
        
        BaseController.call(this);
        
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
        
        this._formComponent = new formController({
            parentView: this._view
        });
        this._gridComponent = new gridController({
            parentView: this._view
        });
        
        this._init();
        this._bindEvents();
    };
 
    settingsController.prototype = Object.create(BaseController.prototype);
    
    settingsController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    settingsController.prototype._init = function() {
    };
    
    settingsController.prototype._onViewRendered = function() {
        this._isSettingsRendered = true;
        this._renderComponents();
    };

    settingsController.prototype.showCurrentContent = function() {
        var mainLayout = Application.getMainLayout();
        this.__renderContent();
        mainLayout.getView().showChildView('settingsRegion', this.getView());
    };
    
    settingsController.prototype._renderComponents = function() {
        this._formComponent.showForm();
        this._gridComponent.showGrid();
    };

    settingsController.prototype.renderView = function() {
        this.getView().render();
    };

    return settingsController;
});