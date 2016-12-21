define(
    [
        'backbone',
        'marionette',
        'Application',
        './headerItemView',
        '../collections/headerCollection',
        'text!common/components/header/templates/headerTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        HeaderItemView,
        collection,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'header-menu',
            
            childView: HeaderItemView,
            childViewContainer: ".header-menu-container",

            collection: new collection(),

            templateHelpers : function(){return {};}
        });
    }
);