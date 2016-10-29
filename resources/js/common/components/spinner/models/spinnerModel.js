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
            className : 'spinnerModel',
            defaults : {
                title: '',
                message: '',
                spinclass: ''
            },
            initialize : function() {}
        });
    }
);
