"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'jquery_ui',
    'Application'
], function (
    _,
    Backbone,
    $,
    jquery_ui,
    Application
) {
    return {

        setHiddenOnClick: function(  ) {
            $(document).on('click', function(){
                $('.for-hidden').hide();
            });
        },

        getDate: function( element ) {
            var date;
            try {
                date = $.datepicker.parseDate( 'dd.mm.yy', element.value );
            }catch( error ) {
                date = null;
            }
            return date;
        },

        addDatepickers: function(elementFrom, elementTo) {
            var me = this;
            var commonParams = {
                dateFormat: 'dd.mm.yy',
                showOn: 'both',
                buttonImage: 'resources/img/calendar.png',
                buttonImageOnly: true,
                buttonText: 'Выберите дату',
                maxDate: '0'
            };
            var fromParams = this.applyParams({
                onSelect: function(){
                    elementTo.datepicker("option", "minDate", me.getDate( this ));
                }
            }, commonParams);
            var toParams = this.applyParams({
                onSelect: function(){
                    elementFrom.datepicker("option", "maxDate", me.getDate( this ));
                }
            }, commonParams);
            elementFrom.datepicker(fromParams);
            elementTo.datepicker(toParams);
        },

        scrollToElement: function (psElementId) {
            $('html, body').animate({
                scrollTop: $('#'+psElementId).offset().top
            }, 500);
        },

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