"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    'modules/index/views/indexView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    indexView
) {
    var indexController = function(poConfig) {
        
        CoreUtils.setTitle('Страшные истории - главная страница');
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseController.call(this);
        
        this._isIndexRendered = false;
        this._isDataLoaded = false;
        this._breadCrumbs = [];

        this._view = new indexView();
        
        this._init();
        this._bindEvents();
    };
 
    indexController.prototype = Object.create(BaseController.prototype);
    
    indexController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    indexController.prototype._init = function() {
    };
    
    indexController.prototype._onViewRendered = function() {
        this._isIndexRendered = true;
    };

    indexController.prototype.showCurrentContent = function(poParams) {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender;
        if (!this._isIndexRendered) {
            lfRender = function(){
                layoutView[me._regionName].show(me.getView(), {forceShow: true});
            };
        }
        else {
            lfRender = function(){
                layoutView[me._regionName].show(me.getView(), {forceShow: true});
            };
        }
        
        if (!me._isDataLoaded) {
            var afterSuccess = function(data) {
                var laData = data.data || [];
                var indexData = laData.index || [];
                var breadCrumbsData = laData.breadcrumbs || [];
                var lbSuccess = data.success || false;
                var lsMessage = data.message || '';
                if (!lbSuccess) {
                    Application.trigger('error:modal:show', lsMessage);
                }
                else {
                    me._isDataLoaded = true;
                    me._breadCrumbs = breadCrumbsData;
                    Application.trigger('breadcrumbs:show', breadCrumbsData);
                    me.getView().collection.set(indexData);
                    lfRender();
                }
            };
            var afterError = function(data){
                var lsMessage = data.message || '';
                Application.trigger('error:modal:show', lsMessage);
            };
            Application.trigger('breadcrumbs:hide');
            Application.trigger('spinner:large:show', this._regionName, 'Идет загрузка данных...');
            CoreUtils.axajQuery({
                url: Settings.url.getIndexData
            },
            {
                afterSuccess: afterSuccess,
                afterError: afterError
            });
        }
        else {
            Application.trigger('breadcrumbs:show', me._breadCrumbs);
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