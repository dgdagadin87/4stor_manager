define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/search/components/searchform/templates/searchformTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'searchform-container',

            events : {
                'click .form-submit-button' : 'onSubmitButtonClick'
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            onSortLinkClick: function(ev) {
                ev.preventDefault();
                console.log('clicked');
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);