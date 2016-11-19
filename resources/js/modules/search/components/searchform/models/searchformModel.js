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
            className : 'listbarModel',
            defaults : {
                _storName: '',
                _storRateStart: null,
                _storRateEnd  : null,
                _storDateFrom : null,
                _storDateTo   : null
            },
            initialize : function() {}
        });
    }
);
