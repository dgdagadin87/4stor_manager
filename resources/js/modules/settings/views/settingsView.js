define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/settings/templates/settingsTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'settings-container',

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