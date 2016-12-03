"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'chartManager',
    'settings',
    '_base/BaseController',
    'modules/statchart/models/statchartModel',
    'modules/statchart/views/statchartView',
    'modules/statchart/views/diagramView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    chartManager,
    Settings,
    BaseController,
    statchartModel,
    statchartView,
    diagramView
) {
    var statchartController = function(poConfig) {
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseController.call(this);
        
        this._pageTitle = 'Статистика (диагамма)';
        
        this._isStatchartRendered = false;
        this._isDataLoaded = false;
        this._breadCrumbs = [
            {
                isMain: true,
                name: 'Главная страница',
                url: ''
            },
            {
                isMain: false,
                name: 'Статистика (диаграмма)',
                url: 'statchart'
            }
        ];
        
        this._model = new statchartModel();

        this._chartManager = new chartManager({
            model: this._model,
            radius: 150,
            canvasId: 'categoryChart',
            background: {
                height: 300,
                width: 300,
                color: 'white'
            }
        });

        this._view = new statchartView();
        this._diaView = new diagramView();
        
        this._init();
        this._bindEvents();
    };
 
    statchartController.prototype = Object.create(BaseController.prototype);
    
    statchartController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        this._diaView.on('render', this._onDiaViewRendered.bind(this));
    };
    
    statchartController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    statchartController.prototype._onViewRendered = function() {
        this._isStatchartRendered = true;
        this._view.showChildView('diagramRegion', this._diaView);
    };
    
    statchartController.prototype._onDiaViewRendered = function() {

        this._chartManager.drawColumn(this._diaView.el);
        //this._chartManager.drawCircle(this._diaView.el);
    };

    statchartController.prototype.showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender = function(){
            
            me.__renderContent();
            
            if (!me._isStatchartRendered) {
                layoutView[me._regionName].show(me._view);
            }
        };

        if (me._isGlobalLoading === true) {
            me.__renderSpinner();
            return false;
        }

        if (!me._isDataLoaded) {
            var afterSuccess = function(data) {
                var laData = data.data || [];
                var catNames = laData.categories || [];
                var chartData = laData.chart || [];
                var labelData = laData.labels || [];
                var colorData = laData.colors || [];
                var total = laData.total || 0;
                var lbSuccess = data.success || false;
                var lsMessage = data.message || '';
                
                me._isGlobalLoading = false;
                
                if (!lbSuccess) {
                    Application.trigger('error:modal:show', lsMessage);
                }
                else {
                    me._isDataLoaded = true;
                    me._model.set({
                        'catData'   : catNames,
                        'labelData' : labelData,
                        'chartData' : chartData,
                        'colorData' : colorData,
                        'total': total
                    });
                    lfRender();
                }
            };
            var afterError = function(data){
                var lsMessage = data.message || '';
                me._isGlobalLoading = false;
                Application.trigger('error:modal:show', lsMessage);
            };

            this._isGlobalLoading = true;
            this.__renderSpinner();
            
            CoreUtils.axajQuery({
                url: Settings.url.getStatchartData
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

    statchartController.prototype.renderView = function() {
        this.getView().render();
    };
    
    statchartController.prototype.getModel = function() {
        return this._model;
    };

    return statchartController;
});