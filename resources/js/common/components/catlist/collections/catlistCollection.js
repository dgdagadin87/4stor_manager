define(
    [
        'jquery',
        'underscore',
        'backbone',
        'common/components/catlist/models/catlistModel'
    ],
    function(
        $,
        _,
        Backbone,
        catlistModel
    ) {
        return Backbone.Collection.extend({
            className : 'categoryListCollection',
            model: catlistModel
        });
    }
);
