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
        this._isComponentRendered = false;
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
    
    BaseController.prototype.isComponentRendered = function() {
        return this._isComponentRendered;
    };
    
    BaseController.prototype.setComponentRendered = function(rendered) {
        this._isComponentRendered = rendered;
    };
    
    return BaseController;
});