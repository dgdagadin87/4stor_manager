define(
    [
        'underscore',
        'backbone',
        'marionette',
        'common/components/crumbs/views/crumbsItemView',
        'common/components/crumbs/collections/crumbsCollection',
        'text!common/components/crumbs/templates/crumbsTemplate.html'
    ], function(
        _,
        Backbone,
        Marionette,
        CrumbsItemView,
        collection,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'breadcrumbs',

            childView: CrumbsItemView,
            childViewContainer: ".breadcrumbs-container",

            collection: new collection(),

            events : {
            },
            templateHelpers : function() {
                return {};
            }
        });
    }
);