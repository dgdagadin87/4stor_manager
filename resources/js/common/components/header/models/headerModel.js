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
            className : 'headerModel',
            defaults : {
                'headerId'   : 0,
                'headerName' : '',
                'headerURL'  : '',
                'selected'   : false,
                'outer'      : false
            },
            initialize : function() {}
        });
    }
);
