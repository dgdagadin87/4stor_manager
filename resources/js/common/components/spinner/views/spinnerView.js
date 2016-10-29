define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/spinner/templates/spinnerTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'spinner',

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