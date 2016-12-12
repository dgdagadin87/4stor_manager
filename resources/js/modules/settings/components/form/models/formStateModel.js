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
            className : 'formStateModel',
            defaults : {
                mode: 'add'
            },
            initialize : function() {
            }
        });
    }
);
