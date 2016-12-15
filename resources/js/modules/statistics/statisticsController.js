"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    'modules/statistics/models/statisticsModel',
    'modules/statistics/views/statisticsView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    statisticsModel,
    statisticsView
) {
    var statisticsController = function(poConfig) {
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseController.call(this);
        
        this._pageTitle = 'Статистика';
        
        this._isStatisticsRendered = false;
        this._isDataLoaded = false;
        this._breadCrumbs = [
            {
                isMain: true,
                name: 'Главная страница',
                url: ''
            },
            {
                isMain: false,
                name: 'Статистика',
                url: 'statistics'
            }
        ];
        
        this._pageMeta = {
            pageTitle: 'Статистика (таблица)',
            pageCode: 'statistics'
        };
        
        this._model = new statisticsModel();

        this._view = new statisticsView();
        
        this._init();
        this._bindEvents();
    };
 
    statisticsController.prototype = Object.create(BaseController.prototype);
    
    statisticsController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    statisticsController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    statisticsController.prototype._onViewRendered = function() {
        this._isStatisticsRendered = true;
    };

    statisticsController.prototype.showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender = function(){
            
            me.__renderContent();
            
            if (!me._isStatisticsRendered) {
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
                var statisticsData = laData.statistics || [];
                var lbSuccess = data.success || false;
                var lsMessage = data.message || '';
                
                me._isGlobalLoading = false;
                
                if (!lbSuccess) {
                    me.__showGlobalError(lsMessage);
                }
                else {
                    me._isDataLoaded = true;
                    me._model.set('catData', statisticsData);
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
            
            CoreUtils.axajQuery({
                url: Settings.url.getStatisticsData
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

    statisticsController.prototype.renderView = function() {
        this.getView().render();
    };
    
    statisticsController.prototype.getModel = function() {
        return this._model;
    };

    return statisticsController;
});