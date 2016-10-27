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
            mainApp.addRegions({
                headerRegion: "#header-region",
                mainRegion: "#main-region",
                footerRegion: "#footer-region",
                leftRegion: "#left-region",
                dialogRegion: "#dialog-region"
            });
        mainApp.addInitializer(function () {
            Backbone.history.start();
        });
        return mainApp;
    }
);