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
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'statistics',

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