define(
    [
        'backbone',
        'marionette',
        'Application',
        './indexItemView',
        '../collections/indexCollection',
        'text!modules/index/templates/indexTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        ItemView,
        collection,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            childView: ItemView,
            childViewContainer: ".index-list-container",

            collection: new collection(),

            tagName: 'div',
            className: 'index-list',

            events : {
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