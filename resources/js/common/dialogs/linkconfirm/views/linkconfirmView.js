define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/dialogs/message/templates/dialogMessageTemplate.html'
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
            
            events: {
                'click .message-ok': 'onOkButtonClick'
            },

            onOkButtonClick: function(ev) {
                ev.preventDefault();
                this.trigger('dialog:close');
            },

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