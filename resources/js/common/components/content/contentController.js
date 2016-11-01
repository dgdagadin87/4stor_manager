"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'settings'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    Settings
) {
    var contentController = function() {
        
        BaseController.call(this);
        
        var mainLayout = Application.getMainLayout();
        this._regionManager = new regionManager(mainLayout);
        
        this._init();
        this._bindEvents();
    };
    
    contentController.prototype = Object.create(BaseController.prototype);
    
    contentController.prototype._bindEvents = function() {
    };
    
    contentController.prototype._init = function() {
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

        className = lsClassPrefix+'Module';
        componentName = '_'+lsClassPrefix+'Component';

        // 1)set module
        if (!me[componentName]) {
            me[componentName] = new className({
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