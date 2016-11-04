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
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseController.call(this);
        
        this._isIndexRendered = false;

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
        
        var afterSuccess = function(data) {
            console.log(data);
            var laData = data.data || [];
            var indexData = laData.index || [];
            var lbSuccess = data.success || false;
            var lsMessage = data.message || '';
            if (!lbSuccess) {
                Application.trigger('error:modal:show', lsMessage);
            }
            else {
                me.getView().collection.set(indexData);
                lfRender();
            }
        };
        var afterError = function(){
            Application.trigger('error:modal:show', 'Ошибка на севере');
        };
        
        Application.trigger('spinner:large:show', this._regionName, 'Идет загрузка данных...');
        CoreUtils.axajQuery({
            url: Settings.url.getIndexData
        },
        {
            afterSuccess: afterSuccess,
            afterError: afterError
        });
    };

    indexController.prototype.renderView = function() {
        this.getView().render();
    };
    
    indexController.prototype.getModel = function() {
        return this._model;
    };

    return indexController;
});