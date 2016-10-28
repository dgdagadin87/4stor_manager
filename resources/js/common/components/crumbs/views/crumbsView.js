define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/crumbs/templates/crumbsTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'breadcrumbs',

            events : {
            },
            templateHelpers : function() {
                return {};
            }
        });
    }
);