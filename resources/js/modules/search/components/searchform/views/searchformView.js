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

            ui: {
                dateFrom : '.search-date-from',
                dateTo   : '.search-date-to'
            },

            events : {
                'click .form-submit-button' : 'onSubmitButtonClick'
            },

            initialize: function() {
            },
            
            onSubmitButtonClick: function(ev) {
                ev.preventDefault();
                Application.trigger('searchform:submit');
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);