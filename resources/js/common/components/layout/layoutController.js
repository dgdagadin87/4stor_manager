"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    '_base/BaseController',
    'coreUtils',
    'settings',
    'regionManager',
    'common/components/layout/views/layoutView',
    'common/components/header/headerController',
    'common/components/crumbs/crumbsController',
    'common/components/catlist/catlistController',
    'common/components/catlist/contentController',
    'common/components/spinner/spinnerController'
], function (
    _,
    Backbone,
    $,
    Application,
    BaseController,
    CoreUtils,
    Settings,
    regionManager,
    mainLayoutView,
    headerComponent,
    crumbsComponent,
    catlistComponent,
    contentController,
    spinnerComponent
) {
    var layoutController = function() {

        BaseController.call(this);

        this._regionManager = new regionManager(this);

        this._currentPage = '';
        
        this._isLayoutRendered = false;
        
        this._isDataLoaded = false;
        
        this._commonData = {};

        this._view = new mainLayoutView();

        this._headerComponent = new headerComponent();
        this._crumbsComponent = new crumbsComponent();
        this._catlistComponent = new catlistComponent();
        this._contentController = new contentController();
        this._largeSpinnerComponent = new spinnerComponent();

        this._init();
        this._bindEvents();
    };

    layoutController.prototype = Object.create(BaseController.prototype);

    layoutController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        Application.on('spinner:large:show', this._onLargeSpinnerShow.bind(this));
        Application.on('error:modal:show', this._onModalErrorShow.bind(this));
    };

    layoutController.prototype._init = function() {
    };

    layoutController.prototype._onModalErrorShow = function() {
        var laArgs = arguments || [];
        var errorMsg = laArgs[0] || '';
        alert(errorMsg);
    };

    layoutController.prototype._onLargeSpinnerShow = function() {
        var args = arguments || [];
        var region  = args[1] || '';
        var message = args[2] || '';
        this._largeSpinnerComponent.getModel().set({
            title:message,
            spinclass: 'large'
        });
        this._largeSpinnerComponent.showSpinner(region);
    };

    layoutController.prototype._renderComponents = function() {
        this._headerComponent.showHeader();
        this._crumbsComponent.showBreadCrumbs();
        this._catlistComponent.showCategoryList(this._commonData.categories);
        this._contentComponent.showContent(this._currentPage, {});
    };

    layoutController.prototype._onViewRendered = function() {
        this._isLayoutRendered = true;
        this._renderComponents();
    };

    layoutController.prototype.showComponents = function(action){
        var me = this;
        var showParts = function() {
            if (me._isLayoutRendered) {
                me._renderComponents();
            }
            else {
                me.renderView();
            }
        };
        var afterSuccess = function(data) {
            var laData = data.data || [];
            var lbSuccess = data.success || false;
            var lsMessage = data.message || '';
            if (!lbSuccess) {
                Application.trigger('error:modal:show', lsMessage);
            }
            else {
                var commonData = laData;
                me._isDataLoaded = true;
                me._commonData = commonData;
                showParts();
            }
            
            
        };
        var afterError = function(){
            Application.trigger('error:modal:show', 'Ошибка на севере');
        };
        
        me._currentPage = action;
        if (this._isDataLoaded) {
            showParts(me._commonData);
        }
        else {
            CoreUtils.axajQuery({
                url: Settings.url.getCommonData
            },
            {
                afterSuccess: afterSuccess,
                afterError: afterError
            });
        }
    };

    layoutController.prototype.renderView = function() {
        this.getView().render(arguments);
    };

    return layoutController;
});