define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/dialogs/linkform/templates/linkformTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'settings-link-form-container',

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
                Application.trigger('linkform:submit', this.model);
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
                return {
                    model: this.model.toJSON(),
                    state: this.state.toJSON()
                };
            }
        });
    }
);