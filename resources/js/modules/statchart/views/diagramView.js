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

            tagName: 'canvas',
            id: 'categoryChart',

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