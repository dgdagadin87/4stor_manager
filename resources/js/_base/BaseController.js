"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'Application'
], function (
    _,
    Backbone,
    $,
    Application
) {
    var BaseController = function() {

        this._view = null;
        this._isAdded = false;
    };

    BaseController.prototype.destructor = function() {
        if (this._view) {
            this._view.destroy();
            delete this._view;
        }
        console.log('Module destructor');
    };

    BaseController.prototype.getView = function() {
        return this._view;
    };
    
    return BaseController;
});