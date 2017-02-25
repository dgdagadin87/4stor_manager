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
                labelData: [],
                chartData: [],
                colorData: [],
                total: 0,
                totalTrue: 0
            },
            initialize : function() {
            }
        });
    }
);
