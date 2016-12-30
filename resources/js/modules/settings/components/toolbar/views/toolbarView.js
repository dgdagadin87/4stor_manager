define(
    [
        'underscore',
        'backbone',
        'Application',
        'marionette',
        'text!modules/settings/components/toolbar/templates/toolbarTemplate.html'
    ], function (
        _,
        Backbone,
        Application,
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
                var current = $(ev.currentTarget);
                if (!current.hasClass('toolbar-disabled')) {
                    Application.trigger('linkform:dialog:open', {
                        linkId   : null,
                        linkName : '',
                        linkHref : '',
                        linkIsOn: true,
                        linkIsMultipage: true
                    }, 'add');
                }
            },
            onDeleteClick: function(ev){
                ev.preventDefault();
                var current = $(ev.currentTarget);
                if (!current.hasClass('toolbar-disabled')) {
                    console.log('onDeleteClick');
                }
            }
        });
    }
);