define(
    [
        'backbone',
        'marionette',
        'text!common/components/layout/templates/layoutTemplate.html'
    ], function(
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.LayoutView.extend({
            el : '#main-body',
            
            template : _.template(template),
            
            regions : {
                headerRegion: '#header-region',
                mainRegion: '#main-region',
                leftRegion: '#left-region',
                footerRegion: '#footer-region',
                dialogRegion: '#dialog-region'
            },
            
            initialize: function() {
                
            },
            
            templateHelpers : function() {
                return {}
            }
        });
    }
);