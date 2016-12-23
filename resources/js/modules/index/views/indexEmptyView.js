define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/index/templates/indexEmptyTemplate.html'
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