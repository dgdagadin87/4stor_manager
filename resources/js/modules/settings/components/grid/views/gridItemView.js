define(
    [
        'underscore',
        'backbone',
        'marionette',
        'Application',
        'text!modules/settings/components/grid/templates/gridItemTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        Application,
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
                this.$el.toggleClass('highlight');
            },
            
            onEditClick: function(ev){
                ev.preventDefault();
                var current = $(ev.currentTarget);
                if (!current.hasClass('grid-disabled')) {
                    Application.trigger('linkform:dialog:open', {
                        linkId   : this.model.get('linkId'),
                        linkName : this.model.get('linkName'),
                        linkHref : this.model.get('linkHref'),
                        linkIsOn : this.model.get('linkIsOn'),
                        linkIsMultipage: this.model.get('linkIsMultipage')
                    }, 'edit');
                }
            },
            onDeleteClick: function(ev){
                ev.preventDefault();
                var current = $(ev.currentTarget);
                if (!current.hasClass('grid-disabled')) {
                    console.log('onDeleteClick');
                }
            },

            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);