define(
    [
        'backbone',
        'marionette'
    ], function(
        Backbone,
		Marionette
    ) {
        return Backbone.Marionette.AppRouter.extend({
            appRoutes : {
                "" : "index",
                "page1" : "page1",
                "page2" : "page2",
            }
        });
    }
);