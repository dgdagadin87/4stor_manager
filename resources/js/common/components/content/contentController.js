"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    'coreUtils',
    '_base/BaseController',
    'modules/index/indexController',
    'modules/category/categoryController',
    'modules/search/searchController',
    'modules/statistics/statisticsController',
    'modules/statchart/statchartController',
    'modules/settings/settingsController',
    'modules/about/aboutController'
    
], function (
    _,
    Backbone,
    $,
    Application,
    CoreUtils,
    BaseController,
    indexModule,
    categoryModule,
    searchModule,
    statisticsModule,
    statchartModule,
    settingsModule,
    aboutModule
) {
    var contentController = function() {
        
        BaseController.call(this);
        
        this._init();
        this._bindEvents();
    };
    
    contentController.prototype = Object.create(BaseController.prototype);
    
    contentController.prototype._bindEvents = function() {};
    
    contentController.prototype._init = function() {
    };
    
    
    contentController.prototype.showContent = function(psAction, params) {
        var me = this;
        var loParams = params || {};
        var _regionManager = Application.getMainLayout()._regionManager || {};
        
        var regionName = CoreUtils.getConstructorRegion(psAction);
        var componentName = componentName = '_'+regionName+'Component';
        var componentConstructor;
        var evalString = 'componentConstructor = '+regionName+'Module;';
        eval(evalString);

        // 1)set module
        if (!me[componentName]) {
            me[componentName] = new componentConstructor({
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