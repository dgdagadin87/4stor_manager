define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!common/components/crumbs/templates/crumbsItemTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            tagName: "span",
            className: 'breadcrumbs-item-container',
            template: _.template(template),
            templateHelpers: function(){
                return this.model.toJSON();
            }
        });
    }
);