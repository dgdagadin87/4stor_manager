define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/layout/templates/dialogMessageTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'message-container',

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            templateHelpers : function() {
                return {
                    message: this._message
                };
            }
        });
    }
);