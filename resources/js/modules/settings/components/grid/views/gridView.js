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
            className: 'settings-links',

            events : {
                'click .add': 'onAddClick',
                'click .refresh': 'onRefreshClick'
            },
            
            onAddClick: function(){
                console.log('add');
            },
            onRefreshClick: function(){
                console.log('refresh');
            }
        });
    }
);