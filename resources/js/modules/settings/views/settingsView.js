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
                //formRegion: '.form-region',
                gridRegion: '.grid-region'
            }
        });
    }
);