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
            className: 'category-list-item',
            template: _.template(template),
            
            events: {
                'click .catlist-item': 'onCatlistItemClick'
            },
            
            onCatlistItemClick: function(ev) {
                var current = this.$(ev.currentTarget);
                if (current.hasClass('catlist-disabled')) {
                    ev.preventDefault();
                }
            },
            
            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);