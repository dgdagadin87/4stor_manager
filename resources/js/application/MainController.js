define(
    [
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Application',
        'common/components/layout/layoutController'
    ],
    function (
        $,
        _,
        Backbone,
        Marionette,
        Application,
        layoutComponent
    ) {
        return Backbone.Marionette.Controller.extend({
            initialize: function(options) {
                this._layout = new layoutComponent();
                Application._layout = this._layout;
            },

            index : function() {
                this._layout.showComponents('index', {});
            },
            
            search : function() {
                this._layout.showComponents('search', {});
            },
            
            settings : function() {
                this._layout.showComponents('settings', {});
            },
            
            statistics : function() {
                this._layout.showComponents('statistics', {});
            },
            
            category : function(catId) {
                this._layout.showComponents('category', {
                    categoryId: catId
                });
            }
        });
    }
);