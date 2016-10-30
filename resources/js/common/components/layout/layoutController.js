"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    '_base/BaseController',
    'common/components/layout/views/layoutView',
    'common/components/header/headerController',
    'common/components/crumbs/crumbsController',
    'common/components/catlist/catlistController',
    'common/components/spinner/spinnerController'
], function (
    _,
    Backbone,
    $,
    Application,
    BaseController,
    mainLayoutView,
    headerComponent,
    crumbsComponent,
    catlistComponent,
    spinnerComponent
) {
    var layoutController = function() {

        BaseController.call(this);

        this._currentPage = '';
        
        this._isLayoutRendered = false;

        this._view = new mainLayoutView();

        this._headerComponent = new headerComponent();
        this._crumbsComponent = new crumbsComponent();
        this._catlistComponent = new catlistComponent();
        this._smallSpinnerComponent = new spinnerComponent();
        this._largeSpinnerComponent = new spinnerComponent();

        this._init();
        this._bindEvents();
    };

    layoutController.prototype = Object.create(BaseController.prototype);

    layoutController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        Application.on('spinner:small:show', this._onSmallSpinnerShow.bind(this));
        Application.on('error:modal:show', this._onModalErrorShow.bind(this));
    };

    layoutController.prototype._init = function() {
    };

    layoutController.prototype._onModalErrorShow = function() {
        var laArgs = arguments || [];
        var errorMsg = laArgs[0] || '';
        alert(errorMsg);
    };

    layoutController.prototype._onSmallSpinnerShow = function() {
        this._smallSpinnerComponent.getModel().set({
            title:'Идет загрузка категорий',
            spinclass: 'small'
        });
        this._smallSpinnerComponent.showSpinner('leftRegion');
    };

    layoutController.prototype._renderComponents = function() {
        this._headerComponent.showHeader();
        this._crumbsComponent.showBreadCrumbs();
        this._catlistComponent.showCategoryList();
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