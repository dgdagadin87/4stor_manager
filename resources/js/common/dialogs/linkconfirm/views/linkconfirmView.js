define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/dialogs/linkconfirm/templates/linkconfirmTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'settings-link-confirm-container',

            events : {
                'click .link-submit' : 'onSubmitClick',
                'click .link-cancel' : 'onCancelClick',
                'click .link-ok' : 'onOkClick'
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            onSubmitClick: function(ev) {
                ev.preventDefault();
                Application.trigger('confirmform:submit', this.model);
            },
            
            onCancelClick: function(ev) {
                ev.preventDefault();
                this.trigger('dialog:close');
            },
            
            onOkClick: function(ev) {
                ev.preventDefault();
                Application.trigger('synclinks:refresh');
                this.trigger('dialog:close');
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);