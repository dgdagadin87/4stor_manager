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
            className : 'storlistModel',
            defaults : {
                storId         : 0,
                storName       : '',
                storHref       : '',
                storShortDesc  : '',
                storAuthorId   : 0,
                storAuthorName : '',
                storAuthorHref : '',
                storRate       : 0,
                storDate       : '',
                storWatches    : 0,
                storComments   : 0,
                storCats       : []
            },
            initialize : function() {}
        });
    }
);
