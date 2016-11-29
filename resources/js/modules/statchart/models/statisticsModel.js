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
            className : 'statchartModel',
            defaults : {
                catData: [],
                chartData: [],
                colorData: [],
                total: 0
            },
            initialize : function() {
            }
        });
    }
);
