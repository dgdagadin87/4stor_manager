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
        Application.on('userlist:add', this._onUserAddClick.bind(this));
        Application.on('userlist:delete:checked', this._onUserAddClick.bind(this));
    };
    
    userlistController.prototype._init = function() {
    };

    userlistController.prototype._onUserAddClick = function(event) {
        console.log(event);
    };
    
    userlistController.prototype._onUsersDeleteClick = function(event) {
        console.log(event);
    };

    userlistController.prototype.showCurrentContent = function() {
        var me = this;
        var regionName = me._regionName + '-region';

        var lfRender = function(serverData){
            
            me.__renderContent();
            
            this.setComponentRendered(true);

            ModuleComponent = React.createFactory(ModuleComponent);

            if (!me.isComponentRendered()) {
                React.render(
                    <ModuleComponent
                        serverData={serverData}
                    />,
                    document.getElementById(regionName)
                );
            }
        };

        if (me._isGlobalLoading === true) {
            me.__renderSpinner();
            return false;
        }
        
        if (!me._isDataLoaded) {
            var afterSuccess = function(data) {
                var laData = data.data || [];
                var indexData = laData.userlist || [];
                var breadCrumbsData = laData.breadcrumbs || [];
                var metaData = laData.pageMeta || {};
                var lbSuccess = data.success || false;
                var lsMessage = data.message || '';
                
                me._isGlobalLoading = false;

                if (!lbSuccess) {
                    me.__showGlobalError(lsMessage);
                }
                else {
                    me._isDataLoaded = true;
                    me._breadCrumbs = breadCrumbsData;
                    me._pageMeta = metaData;
                    me.getView().collection.set(indexData);
                    lfRender(laData);
                }
            };

            var afterError = function(data){
                var lsMessage = data.message || '';
                this._isGlobalLoading = false;
                Application.trigger('error:modal:show', lsMessage);
            };

            this._isGlobalLoading = true;
            this.__renderSpinner();

            CoreUtils.ajaxQuery({
                url: Settings.url.getUserlistData
            },
            {
                afterSuccess: afterSuccess,
                afterError: afterError
            });
        }
        else {
            lfRender();
        }

    };

    return userlistController;
});