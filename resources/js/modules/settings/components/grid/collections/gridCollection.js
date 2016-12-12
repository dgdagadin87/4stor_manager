define(
    [
        'jquery',
        'underscore',
        'backbone',
        'modules/settings/components/form/models/formModel'
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
