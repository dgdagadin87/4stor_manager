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

        this._view = new toolbarView();
        
        this._init();
        this._bindEvents();
    };
 
    toolbarController.prototype = Object.create(BaseController.prototype);
    
    toolbarController.prototype._bindEvents = function() {
        var me = this;
        this._view.on('render', this._onViewRendered.bind(this));
        Application.on('synclinks:controls:disable', function(){
            me._view.$('.toolbar-for-disabled').addClass('toolbar-disabled');
        });
        Application.on('synclinks:controls:enable', function(){
            me._view.$('.toolbar-for-disabled').addClass('toolbar-disabled');
        });
    };
    
    toolbarController.prototype._init = function() {
    };
    
    toolbarController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    toolbarController.prototype.showToolbar = function() {
        var layout = this._parentView;
        if (!this.isComponentRendered()) {
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