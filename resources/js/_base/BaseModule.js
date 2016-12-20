"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    'coreUtils',
    './BaseController'
], function (
    _,
    Backbone,
    $,
    Application,
    CoreUtils,
    BaseController
) {
    var BaseModule = function() {

        BaseController.call(this);

        this._view = null;
        this._isAdded = false;
        this._isGlobalLoading = false;
        this._pageMeta = {};
    };
    
    BaseModule.prototype = Object.create(BaseController.prototype);

    BaseModule.prototype.__renderContent = function() {
        var isCurrentModule = CoreUtils.isCurrentModule(this._moduleCode);
        
        // hide all content regions
        isCurrentModule && Application.trigger('content:regions:hide');
        
        // pagetitle widget render
        var title = this._pageMeta.pageTitle;
        var code = this._pageMeta.pageCode;
        isCurrentModule && Application.trigger('pagetitle:render', title, code);
        
        // show current module region
        isCurrentModule && Application.trigger('content:region:show', this._regionName);
        
        // show current module breadcrumbs
        isCurrentModule && Application.trigger('breadcrumbs:show', this._breadCrumbs);
        
        // change title html tag
        isCurrentModule && Application.trigger('title:change', this._pageTitle);
    };
    
    BaseModule.prototype.__renderSpinner = function() {
        var isCurrentModule = CoreUtils.isCurrentModule(this._moduleCode);
        
        // pagetitle widget render
        isCurrentModule && Application.trigger('pagetitle:render', '', '');
        
        // hide breadcrumbs to show spinner
        isCurrentModule && Application.trigger('breadcrumbs:hide');
        
        // hide all content regions to show spinner
        isCurrentModule && Application.trigger('content:regions:hide');
        
        // show spinner
        isCurrentModule && Application.trigger('spinner:large:show', 'Идет загрузка данных...');
        
        // change title html tag to "loading" title
        isCurrentModule && Application.trigger('title:change', 'Идет загрузка данных...');
    };
    
    BaseModule.prototype.__showGlobalError = function(psMessage) {
        Application.trigger('content:regions:hide');
        Application.trigger('error:modal:show', psMessage);
    };
    
    return BaseModule;
});