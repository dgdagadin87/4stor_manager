"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'common/components/header/views/headerView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    headerView
) {
    var headerController = function() {
        
        BaseController.call(this);
        
        this._isHeaderRendered = false;

        this._view = new headerView();
        
        this._init();
        this._bindEvents();
    };
 
    headerController.prototype = Object.create(BaseController.prototype);
    
    headerController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        Application.on('header:setactive', this._setActiveHeader.bind(this));
    };
    
    headerController.prototype._init = function() {
    };
    
    headerController.prototype._onViewRendered = function() {
        this._isHeaderRendered = true;
        this._setActiveHeader();
    };

    headerController.prototype.showHeader = function() {
        var mainLayout = Application.getMainLayout();
        mainLayout.getView().showChildView('headerRegion', this.getView());
        Application.trigger('header:setactive');
    };

    headerController.prototype.renderView = function() {
        this.getView().render();
    };
    
    headerController.prototype._setActiveHeader = function() {
        var params = CoreUtils.getURIParams();
        var rootParam = params[0] || 'main';
        var classes = ['main', 'search', 'settings', 'statistics'];
        var headerClass = classes.indexOf(rootParam) !== -1 ? rootParam : 'main';
        this._view.$('.header-menu-item').removeClass('active');
        this._view.$('.'+headerClass).addClass('active');
    };
    
    headerController.prototype.getModel = function() {
        return this._model;
    };

    return headerController;
});