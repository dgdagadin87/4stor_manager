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
            className : 'searchDataModel',
            defaults : {
                storName: '',
                storRateStart    : null,
                storRateEnd      : null,
                storDateFrom     : null,
                storDateTo       : null,
                storWatchesFrom  : null,
                storWatchesTo    : null,
                storCommentsFrom : null,
                storCommentsTo   : null
            },
            initialize : function() {
            }
        });
    }
);
