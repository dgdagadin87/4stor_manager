define(
    [
        'jquery',
        'underscore',
        'backbone',
        'common/modules/catlist/models/indexModel'
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
