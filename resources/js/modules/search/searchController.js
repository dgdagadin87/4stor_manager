"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseModule',
    'common/dialogs/categories/categoriesController',
    'modules/search/models/searchStateModel',
    'modules/search/models/searchDataModel',
    'common/components/storlist/storlistController',
    'common/components/paging/pagingController',
    'common/components/listbar/listbarController',
    'common/components/spinner/spinnerController',
    'modules/search/components//startmessage/startmessageController',
    'modules/search/components/searchform/searchformController',
    'modules/search/views/searchView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseModule,
    chooseCategoriesController,
    metaModel,
    dataModel,
    storlistController,
    pagingController,
    listbarController,
    spinnerController,
    startMessageController,
    searchFormController,
    searchView
) {
    var searchController = function(poConfig) {

        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseModule.call(this);
        
        this._moduleCode = 'search';
        
        this._meta = new metaModel();
        this._data = new dataModel();
        
        this._pageTitle = 'Поиск по историям';

        this._breadCrumbs = [
            {
                isMain: true,
                name: 'Главная страница',
                url: ''
            },
            {
                isMain: false,
                name: 'Поиск по историям',
                url: 'search'
            }
        ];
        
        this._pageMeta = {
            pageTitle: 'Поиск по историям',
            pageCode: 'search'
        };

        this._view = new searchView();
        
        this._startMessageComponent = new startMessageController({
            parentView: this._view
        });
        this._spinnerComponent = new spinnerController({
            layout: this._view,
            outerSpinner: true
        });
        this._searchFormComponent = new searchFormController({
            parentView: this._view,
            regionName: 'searchformRegion',
            eventPrefix: 'search'
        });
        this._toolbarComponent = new listbarController({
            parentView: this._view,
            regionName: 'toolbarRegion',
            eventPrefix: 'search',
            toScrollId: 'searchListRegion'
        });
        this._listComponent = new storlistController({
            parentView: this._view,
            regionName: 'storlistRegion',
            eventPrefix: 'search',
            toScrollId: 'searchListRegion'
        });
        this._pagingComponent = new pagingController({
            parentView  : this._view,
            regionName  : 'pagingRegion',
            eventPrefix : 'search'
        });
        this._chooseComponent = new chooseCategoriesController();
        
        this._chooseComponent.setCategoriesData();
        
        this._init();
        this._bindEvents();
    };

    searchController.prototype = Object.create(BaseModule.prototype);
    
    searchController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        this._meta.on('change', this._onMetaChanged.bind(this));
        Application.on('search:refresh', this._onRefresh.bind(this));
        Application.on('search:form:submit', this._onSearchFormSubmit.bind(this));
        Application.on('search:page:change', this._onCategoryPageChange.bind(this));
        Application.on('search:sort:change', this._onCategorySortChange.bind(this));
        Application.on('categories:dialog:open', this._onModalCategoriesOpen.bind(this));
    };

    searchController.prototype._init = function() {
        this._metaDefault = {
            page: 1,
            sortBy: 'storDate',
            sortType: 'DESC'
        };
    };

    searchController.prototype._onModalCategoriesOpen = function() {
        var categoriesView = this._chooseComponent.getViewForDialog();
        Application.getMainLayout().getView()['dialogCtgRegion'].show(categoriesView);
    };

    searchController.prototype._showSearchSpinner = function() {
        this._view['startRegion'].$el.hide();
        this._view['toolbarRegion'].$el.hide();
        this._view['storlistRegion'].$el.hide();
        this._view['pagingRegion'].$el.hide();
        if (!this._spinnerComponent.isRendered()) {
            this._spinnerComponent.getModel().set({
                title:'Идет загрузка',
                spinclass: 'large'
            });
            this._spinnerComponent.showSpinner();
        }
        this._view['spinnerRegion'].$el.show();
    };

    searchController.prototype._hideSearchSpinner = function() {
        this._view['startRegion'].$el.hide();
        this._view['spinnerRegion'].$el.hide();
        this._view['toolbarRegion'].$el.show();
        this._view['storlistRegion'].$el.show();
        this._view['pagingRegion'].$el.show();
    };

    searchController.prototype._onSearchFormSubmit = function() {
        this._clearErrors();
        this._bindSearchData();
        var errors = this._validateErrors();
        if (errors.length < 1) {
            this.loadData(true);
        }
        else {
            this._showErrors(errors);
        }
    };

    searchController.prototype._clearErrors = function() {
        $('.search-error-block').hide();
    };

    searchController.prototype._showErrors = function(errors) {
        var errorsContent = '';
        _.each(errors, function(error){
            errorsContent += '<div class="error">'+error+'</div>';
        });
        $('.search-error-block').html(errorsContent);
        $('.search-error-block').show();
    };

    searchController.prototype._bindSearchData = function() {
        var data = {
            storName          : $('#search-name').val(),
            searchInShortDesc : $('#search-in-desc').prop('checked'),
            storRateStart     : $('#search-rate-from').val(),
            storRateEnd       : $('#search-rate-to').val(),
            storDateFrom      : $('#search-date-from').val(),
            storDateTo        : $('#search-date-to').val(),
            storWatchesFrom   : $('#search-watches-from').val(),
            storWatchesTo     : $('#search-watches-to').val(),
            storCommentsFrom  : $('#search-comments-from').val(),
            storCommentsTo    : $('#search-comments-to').val()
        };
        this._data.set(data);
    };

    searchController.prototype._validateErrors = function() {
        
        var errors = [];
        var me = this;
        
        // 1)Если все пусто
        var isAllEmpty = true;
        var allParams = ['storName','storRateStart','storRateEnd','storDateFrom','storDateTo','storWatchesFrom','storWatchesTo','storCommentsFrom','storCommentsTo'];
        $.each(allParams, function(key, argName){
            if (!CoreUtils.isEmpty(me._data.get(argName))) {
                isAllEmpty = false;
                return false;
            }
        });
        //if (isAllEmpty) {
        //    errors.push('Хотя бы один критерий поиска должен быть заполнен');
        //}
        if (errors.length > 0) {
            return errors;
        }
        
        // 2)Если числовые параметры не числовые
        var numericParams = ['storRateStart','storRateEnd','storWatchesFrom','storWatchesTo','storCommentsFrom','storCommentsTo'];
        $.each(numericParams, function(key, argName){
            if (!CoreUtils.isEmpty(me._data.get(argName)) && !$.isNumeric(me._data.get(argName))) {
                errors.push('Поля "Рейтинг", "Просмотров" и "Комментариев" должны быть числовыми');
                return false;
            }
        });
        if (errors.length > 0) {
            return errors;
        }
        
        // 3)Если минимальный рейтинг больше максимального
        if (!CoreUtils.isEmpty(me._data.get('storRateStart')) && !CoreUtils.isEmpty(me._data.get('storRateEnd')) && (parseInt(me._data.get('storRateStart')) > parseInt(me._data.get('storRateEnd')))) {
            errors.push('Поле "Рейтинг от" не должно быть больше поля "Рейтинг до"');
        }
        
        // 4)Если минимальное к-во просмотров больше максимального
        if (!CoreUtils.isEmpty(me._data.get('storWatchesFrom')) && !CoreUtils.isEmpty(me._data.get('storWatchesTo')) && (parseInt(me._data.get('storWatchesFrom')) > parseInt(me._data.get('storWatchesTo')))) {
            errors.push('Поле "Просмотров от" не должно быть больше поля "Просмотров до"');
        }
        
        // 5)Если минимальное к-во комментариев больше максимального
        if (!CoreUtils.isEmpty(me._data.get('storCommentsFrom')) && !CoreUtils.isEmpty(me._data.get('storCommentsTo')) && (parseInt(me._data.get('storCommentsFrom')) > parseInt(me._data.get('storCommentsTo')))) {
            errors.push('Поле "Комментариев от" не должно быть больше поля "Комментариев до"');
        }
        
        // 6)Еще не мешало бы сравнить даты
        // ...
        
        if (errors.length > 0) {
            return errors;
        }
        
        return [];
    };

    searchController.prototype._onRefresh = function() {
        this.loadData(false);
    };

    searchController.prototype._onMetaChanged = function() {
        this.loadData(false);
    };

    searchController.prototype._onCategoryPageChange = function(page) {
        this._meta.set('page', page);
    };

    searchController.prototype._onCategorySortChange = function(data) {
        var loData = data || {};
        loData.page = 1;
        this._meta.set(loData);
    };

    searchController.prototype.loadData = function(isGlobal) {
        var me = this;
        
        var lfRender = function(){
            me._renderListComponents({
                toScroll: true
            });
        };

        var afterSuccess = function(data) {
            var laData = data.data || [];
            var searchData = laData.search || [];
            var pagingData = laData.paging || {};
            var metaData = laData.meta || {};
            var lbSuccess = data.success || false;
            var lsMessage = data.message || '';

            Application.trigger('search:submit:enable');
            Application.trigger('search:page:enable');
            Application.trigger('search:listbar:enable');
            Application.trigger('search:loader:hide');
            me._hideSearchSpinner();

            if (!lbSuccess) {
                if (isGlobal) {
                    me.__showGlobalError(lsMessage);
                }
                else {
                    Application.trigger('error:modal:show', lsMessage);
                }
            }
            else {
                me._listComponent.setData(searchData);
                me._pagingComponent.setData(pagingData);
                me._toolbarComponent.setData(metaData);

                lfRender();
            }
        };

        if (isGlobal) {
            me._meta.set(me._metaDefault);
            me._showSearchSpinner();
        }

        var chooseModel = me._chooseComponent.getModel().toJSON();

        Application.trigger('search:submit:disable');
        Application.trigger('search:page:disable');
        Application.trigger('search:listbar:disable');
        Application.trigger('search:loader:show');

        CoreUtils.ajaxQuery({
            url: Settings.url.getSearchData,
            method: 'POST',
            data: {
                page    : me._meta.get('page'),
                sortBy  : me._meta.get('sortBy'),
                sortType: me._meta.get('sortType'),
                
                storName         : me._data.get('storName'),
                searchInShortDesc: me._data.get('searchInShortDesc'),
                storRateStart    : me._data.get('storRateStart'),
                storRateEnd      : me._data.get('storRateEnd'),
                storDateFrom     : me._data.get('storDateFrom'),
                storDateTo       : me._data.get('storDateTo'),
                storWatchesFrom  : me._data.get('storWatchesFrom'),
                storWatchesTo    : me._data.get('storWatchesTo'),
                storCommentsFrom : me._data.get('storCommentsFrom'),
                storCommentsTo   : me._data.get('storCommentsTo'),
                
                categories       : chooseModel.checkedCategories
            }
        },
        {
            afterSuccess: afterSuccess,
            afterError: me.afterError
        });
    };

    searchController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
        this._renderBaseComponents();
    };

    searchController.prototype.showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender = function(){
            me.__renderContent();
            if (!me.isComponentRendered()) {
                layoutView[me._regionName].show(me.getView());
            }
        };
        lfRender();
    };

    searchController.prototype._renderBaseComponents = function() {
        this._searchFormComponent.showSearchForm();
        this._startMessageComponent.showStartMessage();
    };

    searchController.prototype._renderListComponents = function() {
        var config = arguments[0] || {};
        var toScroll = config.toScroll;
        this._listComponent.showStorList(toScroll);
        this._pagingComponent.showPaging();
        this._toolbarComponent.showToolbar();
    };

    searchController.prototype.renderView = function() {
        this.getView().render();
    };

    searchController.prototype.afterError = function(data) {
        var lsMessage = data.message || '';
        this._isGlobalLoading = false;
        Application.trigger('error:modal:show', lsMessage);
    };

    searchController.prototype.getModel = function() {
        return this._model;
    };

    return searchController;
});