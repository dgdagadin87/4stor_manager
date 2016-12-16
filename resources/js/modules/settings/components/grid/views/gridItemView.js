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
                'click .edit-button': 'onEditClick',
                'click .delete-button': 'onDeleteClick'
            },
            
            onEditClick: function(){
                console.log('onEditClick');
            },
            onDeleteClick: function(){
                console.log('onDeleteClick');
            },

            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);