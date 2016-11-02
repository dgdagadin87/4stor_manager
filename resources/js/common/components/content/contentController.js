"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'settings',
    'modules/index/indexController'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    Settings,
    indexModule
) {
    var contentController = function() {
        
        BaseController.call(this);
        
        this._init();
        this._bindEvents();
    };
    
    contentController.prototype = Object.create(BaseController.prototype);
    
    contentController.prototype._bindEvents = function() {
    };
    
    contentController.prototype._init = function() {
        this._contentConstructors = {
            index: indexModule
        };
    };
    
    
    contentController.prototype.showContent = function(psAction, params) {
        var me = this;
        var loParams = params || {};
        var _regionManager = Application.getMainLayout()._regionManager || {};
        var lsClassPrefix = 'index';
        var componentName, className;
        if (psAction === 'index') {
            lsClassPrefix = 'index';
        }
        var regionName = lsClassPrefix+'Region';

        className = lsClassPrefix;
        componentName = '_'+lsClassPrefix+'Component';

        // 1)set module
        if (!me[componentName]) {
            me[componentName] = new this._contentConstructors[className]({
                regionName: regionName
            });
        }

        // 2)prepare region for showing
        _regionManager.prepareRegionForRender(regionName);

        // 3)render content component
        me[componentName].showCurrentContent(loParams);
    };

    return contentController;
});