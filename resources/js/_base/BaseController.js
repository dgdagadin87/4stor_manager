"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application'
], function (
    _,
    Backbone,
    $,
    Application
) {
    var BaseController = function() {

        this._view = null;
        this._isAdded = false;
        this._isGlobalLoading = false;
        this._pageMeta = {};
    };

    BaseController.prototype.destructor = function() {
        if (this._view) {
            this._view.destroy();
            delete this._view;
        }
        console.log('Module destructor');
    };

    BaseController.prototype.__renderContent = function() {
        Application.trigger('content:regions:hide');
        Application.trigger('pagetitle:render', this._pageMeta.pageTitle, this._pageMeta.pageCode);
        Application.trigger('content:region:show', this._regionName);
        Application.trigger('breadcrumbs:show', this._breadCrumbs);
        Application.trigger('title:change', this._pageTitle);
    };
    
    BaseController.prototype.__renderSpinner = function() {
        Application.trigger('pagetitle:render', '', '');
        Application.trigger('breadcrumbs:hide');
        Application.trigger('content:regions:hide');
        Application.trigger('spinner:large:show', 'Идет загрузка данных...');
        Application.trigger('title:change', 'Идет загрузка данных...');
    };
    
    BaseController.prototype.__showGlobalError = function(psMessage) {
        Application.trigger('content:regions:hide');
        Application.trigger('error:modal:show', psMessage);
    };

    BaseController.prototype.getView = function() {
        return this._view;
    };
    
    return BaseController;
});