define(
    [
        'backbone',
        'marionette',
        'Application',
        './indexItemView',
        'text!modules/index/templates/indexTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        ItemView,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            childView: ItemView,
            childViewContainer: ".index-list-container",

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