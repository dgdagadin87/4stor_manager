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
                linkId   : null,
                linkName : '',
                linkHref : ''
            },
            initialize : function() {
            }
        });
    }
);
