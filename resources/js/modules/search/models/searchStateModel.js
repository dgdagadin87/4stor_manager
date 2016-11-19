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
            className : 'searchStateModel',
            defaults : {
                page: 1,
                sortBy: 'storDate',
                sortType: 'DESC'
            },
            initialize : function() {
            }
        });
    }
);
