define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/statistics/templates/statisticsTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'statistics-container',

            events : {
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);