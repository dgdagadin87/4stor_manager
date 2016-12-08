define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/pagetitle/templates/pagetitleTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'page-title',

            events : {},

            initialize: function() {},
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);