define(
    [
        'jquery',
        'underscore',
        'backbone',
        '../models/gridModel'
    ],
    function(
        $,
        _,
        Backbone,
        formModel
    ) {
        return Backbone.Collection.extend({
            className : 'settingsGridCollection',
            model: formModel
        });
    }
);
