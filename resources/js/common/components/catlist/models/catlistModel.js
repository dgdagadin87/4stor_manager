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
            className : 'catlistModel',
            defaults : {
                categoryId       : 0,
                categoryUrl      : '',
                categoryName     : ''
            },
            initialize : function() {}
        });
    }
);
