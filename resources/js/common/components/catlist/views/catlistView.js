define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/catlist/templates/catlistTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'categories',

            events: {
                'click .catlist-item': 'onCatlistItemClick'
            },
            
            onCatlistItemClick: function(ev) {
                var current = this.$(ev.currentTarget);
                if (current.hasClass('catlist-disabled')) {
                    ev.preventDefault();
                }
            },

            templateHelpers : function() {
                return {
                    importantCats: Application.request('catlist:get:important'),
                    otherCats: Application.request('catlist:get:other')
                };
            }
        });
    }
);