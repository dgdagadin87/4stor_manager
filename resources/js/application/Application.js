define(
    [
        'backbone',
        'marionette'
    ],
    function (
        Backbone,
        Marionette
    ) {
        var mainApp = new Backbone.Marionette.Application();
        mainApp.addInitializer(function () {
            Backbone.history.start();
        });
        return mainApp;
    }
);