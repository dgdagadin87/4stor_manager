define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/settings/templates/settingsTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.LayoutView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'settings-container',

            regions: {
                toolbarRegion: '.toolbar-region',
                pagingRegion: '.paging-region',
                gridRegion: '.grid-region'
            }
        });
    }
);