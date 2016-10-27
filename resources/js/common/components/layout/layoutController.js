"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'common/components/layout/views/layoutView'
], function (
    _,
    Backbone,
    $,
    mainLayoutView
) {
    var layoutController = function() {
        this._init();
    };
    
    layoutController.prototype._init = function() {
        this._view = new mainLayoutView();
        
        this._view.on('initialize', function(){
            console.log('view.initialized');
        });
    };
    
    layoutController.prototype.addMainRegion = function(regionName, regionId, view) {
        var region = this.regions[regionName];
        var regionDOM = document.getElementById(regionId);
        if (regionDOM) {
            if (!region) {
                region = this._view.addRegion(regionName, '#' + regionId);
            }
            region.show(view);
        } else {
            regionDOM = document.createElement('div');
            regionDOM.id = regionId;
            this.$el.append(regionDOM);
            region = this.addRegion(regionName, '#' + regionId);
            region.show(view);
        }
    };
    
    layoutController.prototype.getView = function(view) {
        return this._view;
    };

    return layoutController;
});