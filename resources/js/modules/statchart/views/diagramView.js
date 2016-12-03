define(
    [
        'backbone',
        'marionette',
        'Application'
    ], function(
        Backbone,
        Marionette,
        Application
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(''),

            tagName: 'div',
            id: 'ct-chart ct-golden-section',

            events : {
            },

            initialize: function() {
            },
            
            onShow: function() {
            },
            
            templateHelpers : function() {
                return {};
            }
        });
    }
);