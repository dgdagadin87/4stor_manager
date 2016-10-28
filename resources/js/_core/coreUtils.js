"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application'
], function (
    _,
    Backbone,
    $,
    Application
) {
    return {

        getCurrentRoute : function(){
            return Backbone.history.fragment;
        },

        getURIParams : function(){
            var currentURI = this.getCurrentRoute();
            var laParams = currentURI.split('/') || [];
            return laParams;
        },
        
        isEmpty : function(value){
            if (value === null || value === '' || value === undefined ){
                return true;
            }
            else {
                return false;
            }
        },
        
        emptyFunction: function () {
            return;
        },
        
        applyParams: function(object, config) {
            var property;
            if (object) {
                for (property in config) {
                    object[property] = config[property];
                }
            }
            return object;
        },
        
        axajQuery: function(config, functions){
            var loConf = config || {};
            var BeforeSend    = lfIsEmpty(functions.beforeSend)    || !$.isFunction(functions.beforeSend)    ? this.emptyFunction : functions.beforeSend;
            var AfterSuccess  = lfIsEmpty(functions.afterSuccess)  || !$.isFunction(functions.afterSuccess)  ? this.emptyFunction : functions.afterSuccess;
            var AfterError    = lfIsEmpty(functions.afterError)    || !$.isFunction(functions.afterError)    ? this.emptyFunction : functions.afterError;
            var AfterComplete = lfIsEmpty(functions.afterComplete) || !$.isFunction(functions.afterComplete) ? this.emptyFunction : functions.afterComplete;
                
            var queryConfig = {
                    type: 'POST',
                    async: true,
                    cache: false,
                    dataType: 'json',
                    headers: {
                        Connection: 'close'
                    },
                    beforeSend: function(jqXHR, settings){
                        BeforeSend(jqXHR, settings);
                    },
                    success: function(data, textStatus, jqXHR){
                        AfterSuccess(data, textStatus, jqXHR);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('На сервере какая-то ошибка');
                        AfterError(jqXHR, textStatus, errorThrown);
                    },
                    complete: function(jqXHR, textStatus){
                        AfterComplete(jqXHR, textStatus);
                    }
                };
            var cfg = this.applyParams(loConf, queryConfig);
            
            $.ajax(cfg);
        }

    };
});