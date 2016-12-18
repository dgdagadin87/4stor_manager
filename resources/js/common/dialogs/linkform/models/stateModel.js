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
            className : 'linkformStateModel',
            defaults : {
                title: '',
                submit: ''
            },
            initialize : function() {}
        });
    }
);
