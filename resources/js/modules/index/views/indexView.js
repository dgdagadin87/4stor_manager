define(
    [
        'backbone',
        'marionette',
        'Application',
        './indexItemView',
        './indexEmptyView',
        '../collections/indexCollection',
        'text!modules/index/templates/indexTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        ItemView,
        EmptyView,
        collection,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            emptyView: EmptyView,

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