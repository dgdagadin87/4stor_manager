"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'settings',
    'Application',
    '_base/BaseController',
    './views/linkformView',
    './models/stateModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Settings,
    Application,
    BaseController,
    formView,
    stateModel
) {
    var formController = function() {
        
        BaseController.call(this);

        this._state = new stateModel;

        this._init();
        this._bindEvents();
    };
 
    formController.prototype = Object.create(BaseController.prototype);
    
    formController.prototype._bindEvents = function() {
        Application.on('linkform:submit', this._onLinkFormSubmit.bind(this));
    };
    
    formController.prototype._init = function() {
    };
    
    formController.prototype._onViewRendered = function() {
    };
    
    formController.prototype._onLinkFormSubmit = function(model) {
        // 1. Инициализация
        var linkId = model.get('linkId');
        var mode = _.isEmpty(linkId) ? 'ADD' : 'EDIT';

        // 2. Очистка ошибок
        this._clearErrors();
        
        // 3. Биндинг
        this._bindData();

        // 3. Вывод ошибок (если есть)
        var errors = this._validateErrors();
        if (errors.length > 0) {
            this._showErrors(errors);
            return;
        }
        
        // 4. Отправка данных
        this['_addOrEditLink'](mode);
        
    };
    
    formController.prototype._validateErrors = function() {
        var errors = [];
        var me = this;
        
        // 1)Название - не пустое
        if (CoreUtils.isEmpty(me._model.get('linkName'))) {
            errors.push('Поле "Имя ссылки" не должно быть пустым');
        }
        
        // 2)Ссылка - не пустое
        if (CoreUtils.isEmpty(me._model.get('linkHref'))) {
            errors.push('Поле "Адрес ссылки" не должно быть пустым');
        }

        if (errors.length > 0) {
            return errors;
        }
        
        return [];
    };
    
    formController.prototype._addOrEditLink = function(mode) {
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
            url: Settings.url[( mode === 'ADD' ? 'add' : 'edit' ) + 'Link'],
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
    
    formController.prototype._clearErrors = function() {
        $('.link-form-error-block').hide();
    };
    
    formController.prototype._showErrors = function(errors) {
        var errorsContent = '';
        _.each(errors, function(error){
            errorsContent += '<div class="error">'+error+'</div>';
        });
        $('.link-form-error-block').html(errorsContent);
        $('.link-form-error-block').show();
    };
    
    formController.prototype._bindData = function() {
        var data = {
            linkId  : this._view.$('.link-id').val(),
            linkName: this._view.$('.link-name').val(),
            linkHref: this._view.$('.link-href').val(),
            linkIsOn: this._view.$('.link-using').prop('checked') ? true : false,
            linkIsMultipage: this._view.$('.link-multi').prop('checked') ? true : false
        };
        this._model.set(data);
    };

    formController.prototype.getViewForDialog = function(model, mode) {
        if (!_.isEmpty(this._view)) {
            this._view.destroy();
        }
        this._view = new formView();
        this._model = model;
        this._view.model = this._model;
        this._view.state = this._state;
        var title = (mode === 'add' ? 'Добавить' : 'Редактировать') + ' ссылку';
        var submit = mode === 'add' ? 'Добавить' : 'Редактировать';
        this._state.set({
            title: title,
            submit: submit
        });
        return this._view;
    };

    formController.prototype._showPreloader = function() {
        this.getView().$('.message-container').hide();
        this.getView().$('.form-container').hide();
        this.getView().$('.preloader-container').show();
    };
    
    formController.prototype._showMessage = function(message, success) {
        var messageClass = success ? 'success' : 'error';
        this.getView().$('.preloader-container').hide();
        this.getView().$('.form-container').hide();
        this.getView().$('.message-container').show();
        this.getView().$('.message-text').addClass(messageClass);
        this.getView().$('.message-text').text(message);
    };

    return formController;
});