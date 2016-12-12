define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!modules/settings/components/grid/templates/gridItemTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            tagName: "div",
            className: 'grid-item',
            template: _.template(template),
            
            events: {
            },

            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);