define(
    [
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'common/components/layout/layoutController'
    ],
    function (
        $,
        _,
        Backbone,
        Marionette,
        layoutComponent
    ) {
        return Backbone.Marionette.Controller.extend({
            initialize: function(options) {
                this._layout = new layoutComponent();
            },

            index : function() {
                this._layout.showIndex();
            },
            
            search : function() {
                this._layout.showSearch();
            },
            
            settings : function() {
                this._layout.showSettings();
            }
        });
    }
);