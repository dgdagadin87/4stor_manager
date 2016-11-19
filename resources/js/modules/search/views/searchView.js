define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/search/templates/searchTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.LayoutView.extend({
            template : _.template(template),
            
            regions : {
                searchformRegion: '.search-form-region',
                startRegion: '.search-start-region',
                spinnerRegion: '.search-spinner-region',
                toolbarRegion: '.search-toolbar-region',
                storlistRegion: '.search-list-region',
                pagingRegion: '.search-paging-region'
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