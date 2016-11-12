define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!common/components/storlist/templates/storlistItemTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            tagName: "div",
            className: 'storlist-item-container',
            template: _.template(template),
            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);