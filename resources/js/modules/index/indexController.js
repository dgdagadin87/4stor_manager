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
    var indexController = function() {
        
        BaseController.call(this);
        
        this._isIndexRendered = false;

        this._view = new indexView();
        
        this._init();
        this._bindEvents();
    };
 
    indexController.prototype = Object.create(BaseController.prototype);
    
    indexController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    indexController.prototype._init = function() {
    };
    
    indexController.prototype._onViewRendered = function() {
        this._isIndexRendered = true;
    };

    indexController.prototype.showCurrentContent = function() {
        var me = this;
        var lfRender;
        if (!this._isIndexRendered) {
            lfRender = function(){
                me.renderView();
            };
        }
        else {
            lfRender = function(){
                me.renderView();
            };
        }
//        var mainLayout = Application.getMainLayout();
//        mainLayout.getView().showChildView('headerRegion', this.getView());
    };

    indexController.prototype.renderView = function() {
        this.getView().render();
    };
    
    indexController.prototype._setActiveHeader = function(psParam) {
        var classes = ['main', 'search', 'settings', 'best'];
        var headerClass = classes.indexOf(psParam) !== -1 ? psParam : 'main';
        this._view.$('.'+headerClass).addClass('active');
    };
    
    indexController.prototype.getModel = function() {
        return this._model;
    };

    return indexController;
});