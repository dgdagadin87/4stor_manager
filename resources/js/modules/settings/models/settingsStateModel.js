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
            className : 'settingsStateModel',
            defaults : {
                page: 1
            },
            initialize : function() {
            }
        });
    }
);
