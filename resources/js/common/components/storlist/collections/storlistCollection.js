define(
    [
        'jquery',
        'underscore',
        'backbone',
        'common/components/storlist/models/storlistModel'
    ],
    function(
        $,
        _,
        Backbone,
        storlistModel
    ) {
        return Backbone.Collection.extend({
            className : 'storlistCollection',
            model: storlistModel
        });
    }
);
