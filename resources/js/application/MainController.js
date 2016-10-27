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
            
            page1 : function() {
                this._layout.showPage1();
            },
            
            page2 : function() {
                this._layout.showPage2();
            }
        });
    }
);