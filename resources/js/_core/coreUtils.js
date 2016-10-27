"use strict";

define([
    'underscore',
    'backbone', 
    'jquery'
], function (
    _,
    Backbone,
    $
) {
    return {

        getCurrentRoute : function(){
            return Backbone.history.fragment;
        },

        getURIParams : function(){
            var currentURI = this.getCurrentRoute();
            var laParams = currentURI.split('/') || [];
            return laParams;
        }

    };
});