"use strict";

define(
    [
        'underscore',
        'backbone'
    ],
    function(
        _,
        Backbone
    ) {
        return Backbone.Model.extend({
            className : 'headerModel',
            defaults : {
                mainActive: 'active',
                page1Active: '',
                page2Active: ''
            },
            initialize : function() {}
        });
    }
);
