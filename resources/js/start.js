require.config({
    baseUrl : '/resources/js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths : {
        jquery         : 'library/jquery/jquery',
        jquery_ui          : 'library/jquery/jquery-ui',
        jquery_migrate     : 'library/jquery/jquery-migrate.min',
        //jquery             : 'library/jquery/jquery-wrapper',
        underscore         : 'library/underscore/underscore',
        backbone           : 'library/backbone/backbone',
        marionette         : 'library/backbone/backbone.marionette',
        Chartist           : 'library/chartist/chartist.min',

        text               : 'library/require/text',
		
        Application        : 'application/Application',
        Router             : 'application/Router',
        MainController     : 'application/MainController',
		
        settings           : 'config/settings',
        coreUtils          : '_core/coreUtils',
        regionManager      : '_core/regionManager',
        chartManager       : '_core/chartManager'
    },
    shim : {
//        'jquery_migrate' : {
//            deps : [ 'jquery_src' ]
//        },
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
