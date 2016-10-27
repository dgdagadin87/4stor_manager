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
                this._component = new layoutComponent();
            },
            index : function() {
                this._component.renderView();
            }
        });
    }
);