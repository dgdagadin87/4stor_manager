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
            className : 'pagetitleModel',
            defaults : {
                pageCode  : '',
                pageTitle :  ''
            },
            initialize : function() {}
        });
    }
);
