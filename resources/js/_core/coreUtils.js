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

        setTitle: function (title) {
            $('title').text(title);
        },

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
            var BeforeSend    = this.isEmpty(functions.beforeSend)    || !$.isFunction(functions.beforeSend)    ? this.emptyFunction : functions.beforeSend;
            var AfterSuccess  = this.isEmpty(functions.afterSuccess)  || !$.isFunction(functions.afterSuccess)  ? this.emptyFunction : functions.afterSuccess;
            var AfterError    = this.isEmpty(functions.afterError)    || !$.isFunction(functions.afterError)    ? this.emptyFunction : functions.afterError;
            var AfterComplete = this.isEmpty(functions.afterComplete) || !$.isFunction(functions.afterComplete) ? this.emptyFunction : functions.afterComplete;
                
            var queryConfig = {
                    type: 'GET',
                    async: true,
                    cache: false,
                    dataType: 'json',
                    headers: {
                    },
                    beforeSend: function(jqXHR, settings){
                        BeforeSend(jqXHR, settings);
                    },
                    success: function(data, textStatus, jqXHR){
                        AfterSuccess(data, textStatus, jqXHR);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
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