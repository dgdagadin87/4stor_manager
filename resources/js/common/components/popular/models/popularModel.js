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
            className : 'popularsModel',
            defaults : {
                populars: []
            },
            initialize : function() {}
        });
    }
);
