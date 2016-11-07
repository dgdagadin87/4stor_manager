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
            className : 'pagingModel',
            defaults : {
                _currentPage  : 1,
                _numOfPages   : 1,
                
                leftRest        : 0,
                doubleLeftRest  : 0,
                restCurrentNum  : 0,
                nextCurPage     : 0,
                nextNextCurPage : 0,
                
                prevPage        : 0,
                nextPage        : 0
            },
            initialize : function() {}
        });
    }
);
