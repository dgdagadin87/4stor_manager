define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!modules/settings/components/grid/templates/gridEmptyTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            tagName: "div",
            className: 'grid-empty',
            template: _.template(template)
        });
    }
);