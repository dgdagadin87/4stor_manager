"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'common/components/catlist/views/catlistView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    catlistView
) {
    var catlistController = function() {
        
        BaseController.call(this);

        this._view = new catlistView();
        
        this._init();
        this._bindEvents();
    };
    
    catlistController.prototype = Object.create(BaseController.prototype);
    
    catlistController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    catlistController.prototype._init = function() {
    };
    
    catlistController.prototype._onViewRendered = function() {
    };

    catlistController.prototype.renderView = function() {
        this.getView().render();
    };
    
    catlistController.prototype.showCategoryList = function() {
        var beforeSend = function() {
            Application.trigger('spinner:small:show');
        };
        beforeSend();
    };

    return catlistController;
});