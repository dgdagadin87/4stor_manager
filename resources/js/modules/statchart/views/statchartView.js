define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/statchart/templates/statchartTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'statchart-container',

            events : {
            },

            initialize: function() {
            },
            
            onShow: function() {
                //Application.trigger('chart:draw');
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);