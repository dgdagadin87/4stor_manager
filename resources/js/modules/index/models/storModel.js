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
            className : 'storModel',
            defaults : {
                storId         : 0,
                storName       : '',
                storHref       : '',
                storShortDesc  : '',
                storAuthorName : '',
                storAuthorHref : '',
                storRate       : 0,
                storDate       : ''
            },
            initialize : function() {}
        });
    }
);
