define(
    [
        'backbone',
        'marionette',
        'Application',
        'modules/settings/components/grid/views/gridItemView',
        'modules/settings/components/grid/views/gridEmptyView',
        'modules/settings/components/grid/collections/gridCollection',
        'text!modules/settings/components/grid/templates/gridTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        GridItemView,
        GridEmptyView,
        collection,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            template : _.template(template),

            emptyView: GridEmptyView,

            childView: GridItemView,
            childViewContainer: ".settings-grid-container",

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