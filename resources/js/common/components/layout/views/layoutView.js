define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/layout/templates/layoutTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.LayoutView.extend({
            el : '#main-body',
            
            template : _.template(template),

            regions : {
                headerRegion: '#header-region',
                mainRegion: '#main-region',
                crumbsRegion: '#crumbs-region',
                leftRegion: '#left-region',
                footerRegion: '#footer-region',
                dialogMsgRegion: '#dialog-message',
                dialogCtgRegion: '#dialog-categories'
            },
            
            initialize: function() {
            },
            
            onRender: function() {
            },
            
            templateHelpers : function() {
                return {};
            }
        });
    }
);