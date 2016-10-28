require.config({
    baseUrl : '/resources/js',
    paths : {
        jquery         : 'library/jquery/jquery',
        jquery_ui      : 'library/jquery/jquery-ui',
        underscore     : 'library/underscore/underscore',
        backbone       : 'library/backbone/backbone',
        marionette     : 'library/backbone/backbone.marionette',

        text           : 'library/require/text',
		
        Application    : 'application/Application',
        Router         : 'application/Router',
        MainController : 'application/MainController',
		
        settings       : 'config/settings',
        coreUtils      : '_core/coreUtils'
		
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
