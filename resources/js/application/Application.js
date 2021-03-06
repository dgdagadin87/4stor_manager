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
        mainApp.getMainLayout = function(){
            return this._layout;
        };
        mainApp.addInitializer(function () {
            Backbone.history.start();
        });
        return mainApp;
    }
);