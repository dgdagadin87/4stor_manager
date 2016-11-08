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
                ""             : "index",
                "category/:id" : "category",
                "search"       : "search",
                "settings"     : "settings"
            }
        });
    }
);