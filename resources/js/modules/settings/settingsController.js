"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'modules/settings/views/settingsView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    settingsView
) {
    var settingsController = function() {
        
        BaseController.call(this);
        
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
        this.__renderContent();
    };

    settingsController.prototype.showCurrentContent = function() {
        var mainLayout = Application.getMainLayout();
        mainLayout.getView().showChildView('settingsRegion', this.getView());
    };

    settingsController.prototype.renderView = function() {
        this.getView().render();
    };

    return settingsController;
});