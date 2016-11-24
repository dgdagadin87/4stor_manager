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
            className : 'categoriesModel',
            defaults : {
                checkedCategories: []
            },
            initialize : function() {}
        });
    }
);
