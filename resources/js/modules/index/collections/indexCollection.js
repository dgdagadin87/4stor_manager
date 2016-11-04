define(
    [
        'jquery',
        'underscore',
        'backbone',
        'modules/index/models/storModel'
    ],
    function(
        $,
        _,
        Backbone,
        storModel
    ) {
        return Backbone.Collection.extend({
            className : 'storCollection',
            model: storModel
        });
    }
);
