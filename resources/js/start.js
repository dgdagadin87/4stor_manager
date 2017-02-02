require.config({
    baseUrl : '/resources/js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths : {
        jquery         : 'library/jquery/jquery',
        jquery_ui      : 'library/jquery/jquery-ui',
        jquery_migrate : 'library/jquery/jquery-migrate.min',
        underscore     : 'library/underscore/underscore',
        backbone       : 'library/backbone/backbone',
        marionette     : 'library/backbone/backbone.marionette',
        Chartist       : 'library/chartist/chartist.min',
        
        mediaPolyfill  : 'library/chartist/machmedia.polyfill',

        text           : 'library/require/text',
		
        Application    : 'application/Application',
        Router         : 'application/Router',
        MainController : 'application/MainController',
		
        settings       : 'config/settings',
        coreUtils      : '_core/coreUtils',
        regionManager  : '_core/regionManager',
        chartManager   : '_core/chartManager'
    },
    shim : {
        'jquery_ui' : {
            deps : [ 'jquery' ]
        },
        'underscore' : {
            exports : '_'
        },
        'backbone' : {
            deps : [ 'underscore', 'jquery' ],
            exports : 'Backbone'
        },
        'marionette' : {
            'deps' : [ 'underscore', 'backbone', 'jquery' ],
            'exports' : 'Marionette'
        },
        'Chartist' : {
            'deps' : [ 'mediaPolyfill' ]
        }
    },
    waitSeconds : 60
});

require(
    [
        'Application',
        'Router',
        'MainController'
    ],
    function (
        Application,
        Router,
        MainController
    ) {
        Application.appRouter = new Router({
            controller : new MainController()
        });
        Application.start();
    }
);
