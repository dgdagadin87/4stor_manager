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
            className : 'indexModel',
            defaults : {
                categoryId       : 0,
                categoryUrl      : '',
                categoryName     : '',
                stors: []
            },
            initialize : function() {
            }
        });
    }
);
