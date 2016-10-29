define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!common/components/catlist/templates/catlistItemTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            tagName: "div",
            className: 'category-item',
            template: _.template(template),
            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);