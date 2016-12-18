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
            className : 'linkconfirmStateModel',
            defaults : {
                step: 'confirm'
            },
            initialize : function() {}
        });
    }
);
