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
            className: 'header-menu',

            events : {
                'click .header-menu-item' : 'onHeaderMenuClick'
            },

            initialize: function() {
                Application.trigger("header:init");
            },
            
            onRender: function() {
                Application.trigger("header:render");
            },
            
            onHeaderMenuClick: function(ev) {
                this.$('.header-menu-item').removeClass('active');
                this.$(ev.currentTarget).addClass('active');
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);