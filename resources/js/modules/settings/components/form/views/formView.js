define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/settings/components/form/templates/formTemplate.html'
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
                'click .link-submit' : 'onSubmitClick'
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            onSubmitClick: function(ev) {
                console.log('clicked');
            },
            
            templateHelpers : function() {
                return {
                    model: this.model.toJSON(),
                    state: this.state.toJSON()
                }
            }
        });
    }
);