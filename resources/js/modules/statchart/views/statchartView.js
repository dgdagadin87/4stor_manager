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
        return Backbone.Marionette.LayoutView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'statchart-container',

            regions: {
                diagramRegion: '.chart-diagram'
            },

            events : {
            },

            initialize: function() {
            },
            
            onShow: function() {
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);