define(
    [
        'jquery',
        'underscore',
        'backbone',
        'common/components/crumbs/models/crumbsModel'
    ],
    function(
        $,
        _,
        Backbone,
        crumbsModel
    ) {
        return Backbone.Collection.extend({
            className : 'crumbsCollection',
            model: crumbsModel
        });
    }
);
