"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    '_base/BaseController',
    'common/components/userinfo/models/userinfoModel',
    'common/components/userinfo/views/userinfoView'
], function (
    _,
    Backbone,
    $,
    Application,
    BaseController,
    userinfoModel,
    userinfoView
) {
    var userinfoController = function() {

        BaseController.call(this);

        this._model = new userinfoModel();
        
        this._view = new userinfoView();
        
        this._init();
        this._bindEvents();
    };
 
    userinfoController.prototype = Object.create(BaseController.prototype);
    
    userinfoController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    userinfoController.prototype._init = function() {
        this._view.model = this._model;
    };
    
    userinfoController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    userinfoController.prototype.showUserInfo = function() {
        if (!this.isComponentRendered()) {
            var mainLayout = Application.getMainLayout();
            var view = this.getView();
            this.getModel().set(Application.request('user:get:data'));
            mainLayout._regionManager.showRegionByName('userinfoRegion');
            mainLayout.getView()['userinfoRegion'].show(view);
        }
    };

    userinfoController.prototype.renderView = function() {
        this.getView().render();
    };

    userinfoController.prototype.getModel = function() {
        return this._model;
    };

    return userinfoController;
});