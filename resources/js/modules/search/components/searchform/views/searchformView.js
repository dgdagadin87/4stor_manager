define(
    [
        'underscore',
        'backbone',
        'marionette',
        'Application',
        'coreUtils',
        'text!modules/search/components/searchform/templates/searchformTemplate.html'
    ], function(
        _,
        Backbone,
        Marionette,
        Application,
        CoreUtils,
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
                'change @ui.dateFrom': 'onDateFromChange',
                'click .form-submit-button' : 'onSubmitButtonClick'
            },

            onShow: function() {
                CoreUtils.addDatepickers(this.ui.dateFrom, this.ui.dateTo);
            },

            onClose: function () {
                var me = this;
                _.each(['dateFrom','dateTo'], function(name){
                    me.ui[name].datepicker('destroy');
                });
                this.ui.dateInput.datetimepicker('destroy');
            },

            initialize: function() {
            },

            onSubmitButtonClick: function(ev) {
                ev.preventDefault();
                Application.trigger('search:form:submit');
            },
            
            templateHelpers : function() {
                return {};
            }
        });
    }
);