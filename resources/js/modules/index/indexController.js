"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseModule',
    'modules/index/views/indexView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseModule,
    indexView
) {
    var indexController = function(poConfig) {
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseModule.call(this);
        
        this._pageTitle = 'Главная страница';
        this._moduleCode = 'index';
        
        this._isIndexRendered = false;
        this._isDataLoaded = false;
        this._breadCrumbs = [];

        this._view = new indexView();
        
        this._init();
        this._bindEvents();
    };
 
    indexController.prototype = Object.create(BaseModule.prototype);
    
    indexController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    indexController.prototype._init = function() {
    };
    
    indexController.prototype._onViewRendered = function() {
        this._isIndexRendered = true;
    };

    indexController.prototype.showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender = function(){
            me.__renderContent();
            if (!me._isIndexRendered) {
                layoutView[me._regionName].show(me.getView());
            }
        };

        if (me._isGlobalLoading === true) {
            me.__renderSpinner();
            return false;
        }

        if (!me._isDataLoaded) {
            var afterSuccess = function(data) {
                var laData = data.data || [];
                var indexData = laData.index || [];
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
                    lfRender();
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
                url: Settings.url.getIndexData
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

    indexController.prototype.renderView = function() {
        this.getView().render();
    };
    
    indexController.prototype.getModel = function() {
        return this._model;
    };

    return indexController;
});