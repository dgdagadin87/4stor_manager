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
    'common/dialogs/message/views/dialogMessageView',
    'common/components/layout/views/layoutView',
    'common/components/header/headerController',
    'common/components/userinfo/userinfoController',
    'common/components/crumbs/crumbsController',
    'common/components/catlist/catlistController',
    'common/components/content/contentController',
    'common/components/spinner/spinnerController',
    'common/components/pagetitle/pagetitleController'
], function (
    _,
    Backbone,
    $,
    Application,
    BaseController,
    CoreUtils,
    Settings,
    regionManager,
    dialogMessageView,
    mainLayoutView,
    headerComponent,
    userinfoComponent,
    crumbsComponent,
    catlistComponent,
    contentController,
    spinnerComponent,
    pagetitleComponent
) {
    var layoutController = function() {

        BaseController.call(this);

        this._regionManager = new regionManager(this);

        this._urlParams = {};

        this._currentPage = '';

        this._isDataLoaded = false;

        this._commonData = {};

        this._view = new mainLayoutView();

        this._headerComponent = new headerComponent();
        this._userinfoComponent = new userinfoComponent();
        this._pagetitleComponent = new pagetitleComponent();
        this._crumbsComponent = new crumbsComponent();
        this._catlistComponent = new catlistComponent();
        this._contentComponent = new contentController();
        this._largeSpinnerComponent = new spinnerComponent({
            spinnerRegion:'spinnerRegion'
        });

        this._init();
        this._bindEvents();
    };

    layoutController.prototype = Object.create(BaseController.prototype);

    layoutController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));

        /* events */
        Application.on('pagetitle:render', this._onPageTitleRender.bind(this));
        Application.on('spinner:large:show', this._onLargeSpinnerShow.bind(this));
        Application.on('breadcrumbs:show', this._onBreadCrumbsShow.bind(this));
        Application.on('breadcrumbs:hide', this._onBreadCrumbsHide.bind(this));
        Application.on('title:change', this._onTitleChange.bind(this));
        Application.on('content:regions:hide', this._onContentRegionsHide.bind(this));
        Application.on('content:region:show', this._onContentRegionShow.bind(this));
        Application.on('error:modal:show', this._onModalErrorShow.bind(this));

        /* reqres */
        Application.reqres.setHandler('user:get:data', this._onUserGetData.bind(this));
        Application.reqres.setHandler('header:get:data', this._onHeaderGetData.bind(this));
        Application.reqres.setHandler('catlist:get:data', this._onCatlistGetData.bind(this));
        Application.reqres.setHandler('catlist:get:important', this._onCatlistGetImportant.bind(this));
        Application.reqres.setHandler('catlist:get:other', this._onCatlistGetOther.bind(this));
    };

    layoutController.prototype._init = function() {
    };

    /* events START */
    layoutController.prototype._onContentRegionShow = function(regionName) {
        this._regionManager.showRegionByName(regionName);
    };

    layoutController.prototype._onContentRegionsHide = function() {
        this._regionManager.hideContentRegions();
    };
    
    layoutController.prototype._onPageTitleRender = function(pageTitle, pageCode) {
        this._pagetitleComponent.showPageTitle(pageTitle, pageCode);
    };

    layoutController.prototype._onTitleChange = function(title) {
        CoreUtils.setTitle(title);
    };

    layoutController.prototype._onModalErrorShow = function() {
        var laArgs = arguments || [];
        var errorMsg = laArgs[0] || '';
        var messageView = new dialogMessageView();
        messageView._message = errorMsg;
        this._view['dialogMsgRegion'].show(messageView);
    };

    layoutController.prototype._onBreadCrumbsShow = function(paData) {
        this._crumbsComponent.showBreadCrumbs(paData);
    };
    
    layoutController.prototype._onBreadCrumbsHide = function() {
        this._crumbsComponent.hideBreadCrumbs();
    };

    layoutController.prototype._onLargeSpinnerShow = function() {
        var args = arguments || [];
        var message = args[0] || '';
        this._largeSpinnerComponent.getModel().set({
            title:message,
            spinclass: 'large'
        });
        this._largeSpinnerComponent.showSpinner();
    };
    /* events END */
    
    /* reqres START */
    layoutController.prototype._onUserGetData = function() {
        var userData = this._commonData.user || [];
        return userData;
    };
    layoutController.prototype._onHeaderGetData = function() {
        var headerData = this._commonData.headers || [];
        return headerData;
    };
    layoutController.prototype._onCatlistGetData = function() {
        var categoriesData = this._commonData.categories || [];
        return categoriesData;
    };
    layoutController.prototype._onCatlistGetImportant = function() {
        var important = [];
        var categoriesData = this._commonData.categories || [];
        _.each(categoriesData, function(category){
            if (category.categoryImportant === 'y') {
                important.push(category);
            }
        });
        return important;
    };
    layoutController.prototype._onCatlistGetOther = function() {
        var other = [];
        var categoriesData = this._commonData.categories || [];
        _.each(categoriesData, function(category){
            if (category.categoryImportant === 'n') {
                other.push(category);
            }
        });
        return other;
    };
    /* reqres END */

    layoutController.prototype._renderComponents = function() {
        var params = this._urlParams;
        var categories = this._commonData.categories || [];
        this._headerComponent.showHeader();
        this._userinfoComponent.showUserInfo();
        this._pagetitleComponent.showPageTitle('Страшные истории', 'default');
        this._catlistComponent.showCategoryList(categories);
        this._contentComponent.showContent(this._currentPage, params);
    };

    layoutController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
        
        CoreUtils.setHiddenOnClick();
        CoreUtils.setDialogsOnShow();

        this._renderComponents();
    };

    layoutController.prototype.showComponents = function(action, params){
        var me = this;
        var loParams = params || {};
        me._urlParams = loParams;
        var showParts = function() {
            if (me.isComponentRendered()) {
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
            alert('Ошибка на севере');
        };
        
        me._currentPage = action;

        if (this._isDataLoaded) {
            showParts(me._commonData);
        }
        else {
            CoreUtils.ajaxQuery({
                url: Settings.url.getCommonData
            },
            {
                afterSuccess: afterSuccess,
                afterError: afterError
            });
        }
    };

    layoutController.prototype.getCommonData = function() {
        return this._commonData;
    };

    layoutController.prototype.renderView = function() {
        this.getView().render(arguments);
    };

    return layoutController;
});