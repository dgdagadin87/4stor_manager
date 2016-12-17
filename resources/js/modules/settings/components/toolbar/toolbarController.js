"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'modules/settings/components/toolbar/views/toolbarView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    toolbarView
) {
    var toolbarController = function(poConfig) {
        
        BaseController.call(this);
        
        var loConfig = poConfig || {};
        this._parentView = loConfig.parentView || {};
        
        this._isToolbarRendered = false;

        this._view = new toolbarView();
        
        this._init();
        this._bindEvents();
    };
 
    toolbarController.prototype = Object.create(BaseController.prototype);
    
    toolbarController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    toolbarController.prototype._init = function() {
    };
    
    toolbarController.prototype._onViewRendered = function() {
        this._isToolbarRendered = true;
    };

    toolbarController.prototype.showToolbar = function() {
        var layout = this._parentView;
        if (!this._isToolbarRendered) {
            layout.showChildView('toolbarRegion', this.getView());
        }
        else {
            this.renderView();
        }
    };

    toolbarController.prototype.renderView = function() {
        this.getView().render();
    };

    return toolbarController;
});