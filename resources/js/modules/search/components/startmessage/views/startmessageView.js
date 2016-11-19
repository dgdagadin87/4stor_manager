define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/search/components/startmessage/templates/startmessageTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'search-start-message',

            events : {
            },

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