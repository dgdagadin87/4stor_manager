"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    './views/linkformView',
    './models/stateModel'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
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
            linkIsOn: this._view.$('.link-using').attr('checked') ? true : false,
            linkIsMultipage: this._view.$('.link-multi').attr('checked') ? true : false
        };
        this._model.set(data);
        console.log(this.model);
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

    return formController;
});