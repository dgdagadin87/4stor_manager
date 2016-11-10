"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController'
    //'modules/storelist/views/storlistView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController
    //storlistView
) {
    var storlistController = function(poConfig) {
        
        CoreUtils.setTitle('Страшные истории - страница категории ""');
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseController.call(this);
        
        this._isStorlistRendered = false;
        this._isDataLoaded = false;
        this._breadCrumbs = [];

        //this._view = new storlistView();
        
        this._init();
        this._bindEvents();
    };
 
    storlistController.prototype = Object.create(BaseController.prototype);
    
    storlistController.prototype._bindEvents = function() {
        //this._view.on('render', this._onViewRendered.bind(this));
    };
    
    storlistController.prototype._init = function() {
    };
    
    storlistController.prototype._onViewRendered = function() {
        this._isStorlistRendered = true;
        
    };
    
    storlistController.prototype.showCurrentContent = function(poParams) {
        console.log(poParams);
    };

//    storlistController.prototype.showCurrentContent = function(poParams) {
//        var me = this;
//        var mainLayout = Application.getMainLayout();
//        var layoutView = mainLayout.getView();
//        var lfRender = function(){
//            if (!me.__isStorlistRendered) {
//                layoutView[me._regionName].show(me.getView(), {forceShow: true});
//            }
//            else {
//                me.renderView();
//            }
//        };
//        
//        if (!me._isDataLoaded) {
//            var afterSuccess = function(data) {
//                var laData = data.data || [];
//                var indexData = laData.index || [];
//                var breadCrumbsData = laData.breadcrumbs || [];
//                var lbSuccess = data.success || false;
//                var lsMessage = data.message || '';
//                if (!lbSuccess) {
//                    Application.trigger('error:modal:show', lsMessage);
//                }
//                else {
//                    me._isDataLoaded = true;
//                    me._breadCrumbs = breadCrumbsData;
//                    Application.trigger('breadcrumbs:show', breadCrumbsData);
//                    me.getView().collection.set(indexData);
//                    lfRender();
//                }
//            };
//            var afterError = function(data){
//                var lsMessage = data.message || '';
//                Application.trigger('error:modal:show', lsMessage);
//            };
//            Application.trigger('breadcrumbs:hide');
//            Application.trigger('spinner:large:show', this._regionName, 'Идет загрузка данных...');
//            CoreUtils.axajQuery({
//                url: Settings.url.getIndexData
//            },
//            {
//                afterSuccess: afterSuccess,
//                afterError: afterError
//            });
//        }
//        else {
//            Application.trigger('breadcrumbs:show', me._breadCrumbs);
//            lfRender();
//        }
//    };

    storlistController.prototype.renderView = function() {
        this.getView().render();
    };
    
    storlistController.prototype.getModel = function() {
        return this._model;
    };

   return storlistController;
});