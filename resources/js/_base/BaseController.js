"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application',
    'coreUtils'
], function (
    _,
    Backbone,
    $,
    Application,
    CoreUtils
) {
    var BaseController = function() {

    };

    BaseController.prototype.destructor = function() {
        if (this._view) {
            this._view.destroy();
            delete this._view;
        }
        console.log('Controller destructor');
    };

    BaseController.prototype.getView = function() {
        return this._view;
    };
    
    return BaseController;
});