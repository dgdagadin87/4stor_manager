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
            className : 'crumbsModel',
            defaults : {
                name  : '',
                url   :  '',
                isMain: false
            },
            initialize : function() {}
        });
    }
);
