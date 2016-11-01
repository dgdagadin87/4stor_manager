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
                storShortDesc  : '',
                storAuthorName : '',
                storAuthorHref : '',
                storRate       : 0,
                categoryStors : 0
            },
            initialize : function() {}
        });
    }
);
