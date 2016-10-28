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

        this._currentPage = '';
        
        this._isLayoutRendered = false;

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

    layoutController.prototype._renderComponents = function() {
        this._headerComponent.showHeader();
        this._crumbsComponent.showBreadCrumbs();
    };

    layoutController.prototype._onViewRendered = function() {
        this._isLayoutRendered = true;
        this._renderComponents();
    };

    layoutController.prototype.showComponents = function(action){
        this._currentPage = action;
        if (this._isLayoutRendered) {
            this._renderComponents();
        }
        else {
            this.renderView();
        }
    };

    layoutController.prototype.renderView = function() {
        this.getView().render(arguments);
    };

    return layoutController;
});