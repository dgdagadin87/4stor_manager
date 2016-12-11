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
            className : 'formModel',
            defaults : {
                nameValue   : '',
                hrefValue   : '',
                submitValue : 'Добавить ссылку'
            },
            initialize : function() {
            }
        });
    }
);
