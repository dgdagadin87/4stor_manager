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

            events : {
            },
            templateHelpers : function() {
                return {};
            }
        });
    }
);