define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/header/templates/headerTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            initialize: function() {
                Application.trigger("header:init");
            },
            
            onRender: function() {
                Application.trigger("header:render");
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);