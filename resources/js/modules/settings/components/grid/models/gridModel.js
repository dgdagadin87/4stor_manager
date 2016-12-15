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
            className : 'gridModel',
            defaults : {
                linkId   : null,
                linkName : '',
                linkHref : '',
                linkIsOn: true,
                linkIsMultipage: true,
            },
            initialize : function() {
            }
        });
    }
);
