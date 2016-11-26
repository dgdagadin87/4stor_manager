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
            className : 'statisticsModel',
            defaults : {
                numOfCategories     : 0,
                numOfStories        : 0,
                numOfAuthors        : 0,
                mostPopularCatId    : 0,
                mostPopularCatName  : '',
                lessPopularCatId    : 0,
                lessPopularCatName  : '',
                mostPopularStorId   : 0,
                mostPopularStorName : '',
                lessPopularStorId   : 0,
                lessPopularStorName : '',
                chartData: []
            },
            initialize : function() {
            }
        });
    }
);
