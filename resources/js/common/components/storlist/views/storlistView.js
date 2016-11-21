define(
    [
        'underscore',
        'backbone',
        'marionette',
        'common/components/storlist/views/storlistEmptyView',
        'common/components/storlist/views/storlistItemView',
        'common/components/storlist/collections/storlistCollection',
        'text!common/components/storlist/templates/storlistTemplate.html'
    ], function(
        _,
        Backbone,
        Marionette,
        StorlistEmptyView,
        StorlistItemView,
        collection,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'storlist',

            emptyView: StorlistEmptyView,

            childView: StorlistItemView,
            childViewContainer: ".storlist-list-container",

            collection: new collection(),

            events : {
            },
            templateHelpers : function() {
                return {};
            }
        });
    }
);