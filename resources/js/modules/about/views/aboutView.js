define(
    [
        'underscore',
        'backbone',
        'marionette',
        'text!modules/about/templates/aboutTemplate.html'
    ], function(
        _,
        Backbone,
        Marionette,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),
            tagName: 'div',
            className: 'about-container'
        });
    }
);