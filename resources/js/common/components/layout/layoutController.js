"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    '_base/BaseController',
    'common/components/layout/views/layoutView',
    'common/components/header/headerController',
    'common/components/crumbs/crumbsController'
], function (
    _,
    Backbone,
    $,
    Application,
    BaseController,
    mainLayoutView,
    headerComponent,
    crumbsComponent
) {
    var layoutController = function() {

        BaseController.call(this);

        this._view = new mainLayoutView();

        this._headerComponent = new headerComponent();
        this._crumbsComponent = new crumbsComponent();

        this._init();
        this._bindEvents();
    };
    
    layoutController.prototype = Object.create(BaseController.prototype);
    
    layoutController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    layoutController.prototype._init = function() {
    };
    
    layoutController.prototype._onViewRendered = function() {
        this._view._isLayoutRendered = true;
        this._view.showChildView('headerRegion', this._headerComponent.getView());
        this._view.showChildView('crumbsRegion', this._crumbsComponent.getView());
    };
    
    layoutController.prototype.renderView = function() {
        if (!this._view._isLayoutRendered) {
            this.getView().render();
        }
    };
    
    layoutController.prototype.showIndex = function() {
        this.renderView();
    };
    layoutController.prototype.showSearch = function() {
        this.renderView();
    };
    layoutController.prototype.showSettings = function() {
        this.renderView();
    };
    
    return layoutController;
});