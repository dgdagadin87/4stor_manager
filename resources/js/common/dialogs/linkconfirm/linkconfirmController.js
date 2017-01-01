"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'settings',
    'Application',
    '_base/BaseController',
    './views/linkconfirmView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Settings,
    Application,
    BaseController,
    confirmView
) {
    var confirmController = function() {
        
        BaseController.call(this);

        this._init();
        this._bindEvents();
    };
 
    confirmController.prototype = Object.create(BaseController.prototype);
    
    confirmController.prototype._bindEvents = function() {
        Application.on('confirmform:submit', this._onLinkConfirmSubmit.bind(this));
    };
    
    confirmController.prototype._init = function() {
    };
    
    confirmController.prototype._onViewRendered = function() {
    };
    
    confirmController.prototype._onLinkConfirmSubmit = function() {
        // 1. Биндинг
        this._bindData();
        
        // 2. Отправка данных
        this['_deleteLink']();
        
    };

    confirmController.prototype._bindData = function() {
        var data = {
            linkId  : this._view.$('.link-id').val()
        };
        this._model.set(data);
    };

    confirmController.prototype._deleteLink = function() {
        var me = this;
        var afterSuccess = function(data){
            var lbSuccess = data.success || false;
            var lsMessage = data.message || '';
            me._showMessage(lsMessage, lbSuccess);
        };
        var afterError = function(data){
            var lsMessage = data.message || '';
            Application.trigger('error:modal:show', lsMessage);
        };
        
        this._showPreloader();
        
        CoreUtils.ajaxQuery({
            url: Settings.url['deleteLink'],
            method: 'POST',
            data: {
                model: me._model.toJSON()
            }
        },
        {
            afterSuccess: afterSuccess,
            afterError: afterError
        });
    };

    confirmController.prototype.getViewForDialog = function(model) {
        if (!_.isEmpty(this._view)) {
            this._view.destroy();
        }
        this._view = new confirmView();
        this._model = model;
        this._view.model = this._model;
        return this._view;
    };

    confirmController.prototype._showPreloader = function() {
        this.getView().$('.message-container').hide();
        this.getView().$('.confirm-container').hide();
        this.getView().$('.preloader-container').show();
    };
    
    confirmController.prototype._showMessage = function(message, success) {
        var messageClass = success ? 'success' : 'error';
        this.getView().$('.preloader-container').hide();
        this.getView().$('.confirm-container').hide();
        this.getView().$('.message-container').show();
        this.getView().$('.message-text').addClass(messageClass);
        this.getView().$('.message-text').text(message);
    };

    return confirmController;
});