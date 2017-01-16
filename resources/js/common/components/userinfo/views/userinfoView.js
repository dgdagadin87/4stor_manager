define(
    [
        'backbone',
        'marionette',
        'text!common/components/userinfo/templates/userinfoTemplate.html'
    ], function(
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'user-info',

            events : {},

            initialize: function() {},
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);