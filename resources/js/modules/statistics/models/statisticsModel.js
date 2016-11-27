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
            className : 'statisticsModel',
            defaults : {
                catData: [],
                chartData: []
            },
            initialize : function() {
            }
        });
    }
);
