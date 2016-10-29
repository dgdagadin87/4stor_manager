define(
    [
        'backbone',
        'marionette',
        'Application',
        'common/components/catlist/views/catlistItemView',
        'common/components/catlist/collections/catlistCollection',
        'text!common/components/catlist/templates/catlistTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        CatsItemView,
        collection,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            childView: CatsItemView,
            childViewContainer: ".categories",

            collection: new collection(),

            tagName: 'div',
            className: 'categories',

            events : {
            },
            templateHelpers : function() {
                return {};
            }
        });
    }
);