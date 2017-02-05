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
                storName          : '',
                searchInShortDesc : false,
                storRateStart     : null,
                storRateEnd       : null,
                storDateFrom      : null,
                storDateTo        : null,
                storWatchesFrom   : null,
                storWatchesTo     : null,
                storCommentsFrom  : null,
                storCommentsTo    : null
            },
            initialize : function() {
            }
        });
    }
);
