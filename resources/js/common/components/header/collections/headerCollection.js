define(
    [
        'jquery',
        'underscore',
        'backbone',
        'common/components/header/models/headerModel'
    ],
    function(
        $,
        _,
        Backbone,
        headerModel
    ) {
        return Backbone.Collection.extend({
            className : 'headerCollection',
            model: headerModel
        });
    }
);
