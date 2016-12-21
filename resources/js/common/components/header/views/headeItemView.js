define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/header/templates/headerTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'header-menu-item-div',

            events : {
                'click .header-menu-item' : 'onHeaderMenuClick'
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            onHeaderMenuClick: function(ev) {
                //this.$('.header-menu-item').removeClass('active');
                //this.$(ev.currentTarget).addClass('active');
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);