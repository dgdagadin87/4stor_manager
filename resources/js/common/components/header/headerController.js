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

        this._view = new headerView();
        
        this._init();
        this._bindEvents();
    };
 
    headerController.prototype = Object.create(BaseController.prototype);
    
    headerController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    headerController.prototype._init = function() {
    };
    
    headerController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    headerController.prototype.showHeader = function() {
        var mainLayout = Application.getMainLayout();
        var headerData = Application.request('header:get:data');
        var urlData = CoreUtils.getURIParams();;
        var mainParam = urlData[0] || '';
        this.getView().collection.set(headerData);
        this._setActiveHeader(mainParam);
        if (!this.isComponentRendered()) {
            mainLayout.getView().showChildView('headerRegion', this.getView());
        }
        else {
            this.renderView();
        };
    };

    headerController.prototype.renderView = function() {
        this.getView().render();
    };
    
    headerController.prototype._setActiveHeader = function(activeURL) {
        var view = this.getView();
        var collection = view.collection;
        var model = collection.find(function(model){
            var forActive = model.get('forActive');
            if (forActive.indexOf(activeURL) !== -1) {
                return model;
            }
            return false; 
        });
        model !== false && model.set('selected', true);
    };
    
    headerController.prototype.getModel = function() {
        return this._model;
    };

    return headerController;
});