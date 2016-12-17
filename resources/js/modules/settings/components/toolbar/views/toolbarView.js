define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!modules/settings/components/toolbar/templates/toolbarTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            tagName: "div",
            className: 'grid-toolbar',
            template: _.template(template),
            
            events : {
                'click .button-add': 'onAddClick',
                'click .button-delete': 'onDeleteClick'
            },

            onAddClick: function(ev){
                ev.preventDefault();
                console.log('onAddClick');
            },
            onDeleteClick: function(ev){
                ev.preventDefault();
                console.log('onDeleteClick');
            }
        });
    }
);