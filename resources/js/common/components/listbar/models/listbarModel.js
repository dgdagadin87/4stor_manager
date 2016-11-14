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
            className : 'listbarModel',
            defaults : {
                _currentPage  : 1,
                _numOfStors   : 1,
                
                _sortBy: 'storDate',
                _sortType: 'DESC'
            },
            initialize : function() {}
        });
    }
);
