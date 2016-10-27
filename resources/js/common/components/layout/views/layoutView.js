define(
    [
        'backbone',
        'marionette'
    ], function(
        Backbone,
        Marionette
    ) {
        return Backbone.Marionette.LayoutView.extend({
            el : '#main-body'
        });
    }
);