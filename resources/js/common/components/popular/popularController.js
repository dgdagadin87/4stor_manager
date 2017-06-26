"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'common/components/popular/views/popularView',
    'common/components/popular/models/popularModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    popularView,
    popularModel
) {
    var popularController = function() {
        
        BaseController.call(this);

        this._view = new popularView();
        
        this._model = new popularModel();
        
        this._init();
        this._bindEvents();
    };
 
    popularController.prototype = Object.create(BaseController.prototype);
    
    popularController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    popularController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    popularController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    popularController.prototype.showPopular = function() {
        var mainLayout = Application.getMainLayout();
        var popularData = Application.request('popular:get:data');
        this.getModel().set('populars', popularData);
        if (!this.isComponentRendered()) {
            mainLayout.getView().showChildView('popularRegion', this.getView());
        }
        else {
            this.renderView();
        };
    };

    popularController.prototype.renderView = function() {
        this.getView().render();
    };

    popularController.prototype.getModel = function() {
        return this._model;
    };

    return popularController;
});