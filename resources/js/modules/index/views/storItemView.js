define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!modules/index/templates/catlistItemTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            tagName: "div",
            className: 'category-stor-item',
            template: _.template(template),
            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);