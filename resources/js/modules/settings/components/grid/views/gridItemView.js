define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!modules/settings/components/grid/templates/gridItemTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            tagName: "tr",
            className: 'grid-row',
            template: _.template(template),
            
            events : {
                'click': 'highlightRow',
                'click .edit-button': 'onEditClick',
                'click .delete-button': 'onDeleteClick'
            },
            
            highlightRow: function(ev){
                ev.preventDefault();
                this.$el.toggleClass('highlight');
            },
            
            onEditClick: function(ev){
                ev.preventDefault();
                console.log('onEditClick');
            },
            onDeleteClick: function(ev){
                ev.preventDefault();
                console.log('onDeleteClick');
            },

            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);