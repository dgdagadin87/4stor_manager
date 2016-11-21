define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/storlist/templates/storlistEmptyTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'empty-results',

            initialize: function() {
            },

            onRender: function() {
            },

            templateHelpers : function() {
                return {};
            }
        });
    }
);