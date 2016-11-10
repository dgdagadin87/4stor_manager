define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/category/templates/categoryTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.LayoutView.extend({
            template : _.template(template),
            
            regions : {
                toolbarRegion: '.category-toolbar-region',
                storlistRegion: '.category-list-region',
                pagingRegion: '.category-paging-region'
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