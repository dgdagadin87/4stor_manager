"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseModule',
    'react',
    'jsx!./components/ModuleComponent'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseModule,
    React,
    ModuleComponent
) {
    var userlistController = function(poConfig) {
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseModule.call(this);
        
        this._isRendered = false;
        
        this._moduleCode = 'userlist';
        
        this._pageTitle = 'Пользователи';

        this._isDataLoaded = false;
        this._breadCrumbs = [
            {
                isMain: true,
                name: 'Главная страница',
                url: ''
            },
            {
                isMain: false,
                name: 'Пользователи',
                url: 'userlist'
            }
        ];
        
        this._pageMeta = {
            pageTitle: 'Пользователи',
            pageCode: 'userlist'
        };

        this._init();
        this._bindEvents();
    };
 
    userlistController.prototype = Object.create(BaseModule.prototype);
    
    userlistController.prototype._bindEvents = function() {
        //this._view.on('render', this._onViewRendered.bind(this));
    };
    
    userlistController.prototype._init = function() {
    };
    
    userlistController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    userlistController.prototype.showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var regionName = me._regionName + '-region';

        me.__renderContent();
        
        if (!me.isComponentRendered()) {
            
            this.setComponentRendered(true);

            ModuleComponent = React.createFactory(ModuleComponent);

            React.render(
                ModuleComponent(),
                document.getElementById(regionName)
            );
        }

    };

    return userlistController;
});