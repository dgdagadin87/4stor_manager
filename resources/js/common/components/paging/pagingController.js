"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseController',
    'common/components/paging/models/pagingModel',
    'common/components/paging/views/pagingView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseController,
    pagingModel,
    pagingView
) {
    var pagingController = function(poConfig) {
        
        var loConfig = poConfig || {};
        
        this._numStart = loConfig.numStart || Settings.defaults.numStart;
        this._numEnd   = loConfig.numEnd   || Settings.defaults.numEnd;
        this._numLeft  = loConfig.numLeft  || Settings.defaults.numLeft;
        this._numRight = loConfig.numRight || Settings.defaults.numRight;
        
        BaseController.call(this);
        
        this._isPagingRendered = false;

        this._regionName = loConfig.regionName || 'pagingRegion';
        this._parentView = loConfig.parentView || {};

        this._model = new pagingModel();

        this._view = new pagingView();
        
        this._init();
        this._bindEvents();
    };
 
    pagingController.prototype = Object.create(BaseController.prototype);
    
    pagingController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    pagingController.prototype._init = function() {
        var me = this;
        this._view.model = this._model;
        _.each(['Start','End','Left','Right'], function(name){
            me._view['_num'+name] = me['_num'+name];
        });
    };
    
    pagingController.prototype._onViewRendered = function() {
        this._isPagingRendered = true;
    };

    pagingController.prototype.setData = function(poConf) {
        var loConf = poConf || {};
        this._model.set(loConf);
    };

    pagingController.prototype._shapePaging = function() {
        var currentPage = this._model.get('_currentPage');
        var numOfPages  = this._model.get('_numOfPages');

        var leftRest = currentPage - 1;
        var doubleLeftRest = currentPage - 2;
        var restCurrentNum = numOfPages - currentPage;
        var nextCurPage = currentPage + 1;
        var nextNextCurPage = currentPage + 2;
        var prevPage = currentPage - 1;
        var nextPage = currentPage + 1;
        
        this._model.set({
            leftRest: leftRest,
            doubleLeftRest: doubleLeftRest,
            restCurrentNum: restCurrentNum,
            nextCurPage: nextCurPage,
            nextNextCurPage: nextNextCurPage,
            prevPage: prevPage,
            nextPage: nextPage
        });
    };

    pagingController.prototype.showPaging = function() {

        this._shapePaging();
        
        if (!this._isPagingRendered) {
            this._parentView.showChildView(this._regionName, this._view);
        }
        else {
            this.renderView();
        }
    };

    pagingController.prototype.renderView = function() {
        this.getView().render();
    };

    pagingController.prototype.getModel = function() {
        return this._model;
    };

    return pagingController;
});