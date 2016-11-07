"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'common/components/paging/views/pagingView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    pagingView
) {
    var pagingController = function() {
        
        BaseController.call(this);
        
        this._isPagingRendered = false;

        this._view = new pagingView();
        
        this._init();
        this._bindEvents();
    };
 
    pagingController.prototype = Object.create(BaseController.prototype);
    
    pagingController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    pagingController.prototype._init = function() {
    };
    
    pagingController.prototype._onViewRendered = function() {
        this._isPagingRendered = true;
    };

    pagingController.prototype._setPagingConfig = function(poConf) {
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

    pagingController.prototype.showPaging = function(layoutView, regionName, poConf) {
        
        this._setPagingConfig(poConf);
        
        this._shapePaging();
        
        if (!this._isPagingRendered) {
            layoutView.showChildView(regionName, layoutView);
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