define(
    [
        'jquery',
        'underscore',
        'backbone',
        'modules/index/models/indexModel'
    ],
    function(
        $,
        _,
        Backbone,
        indexModel
    ) {
        return Backbone.Collection.extend({
            className : 'indexCollection',
            model: indexModel
        });
    }
);
