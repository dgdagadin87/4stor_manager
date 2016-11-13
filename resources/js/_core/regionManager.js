"use strict";

define(['underscore','jquery','coreUtils'], function(_,$,CoreUtils) {

    var RegionManager = function(context) {

        if ( ! context) {
            throw new Error('Set content to the RegionManager instance!');
        }

        this._context = context;
        this._cachedRegions = [];
    };

    RegionManager.prototype._getContextInstance = function() {
        return this._context;
    };

    RegionManager.prototype._ifRegionExists = function(regionName) {
        var laCachedRegions = this._getCachedRegions();
        var result = false;
        _.each(laCachedRegions, function(regName){
            if (regionName === regName) {
                result = true;
                return false;
            }
        });
        return result;
    };

    RegionManager.prototype._getCachedRegions = function() {
        return this._cachedRegions;
    };
    
    RegionManager.prototype.getRegionIdByName = function(regionName) {
        switch (regionName) {
            case 'indexRegion':
            default:
                return 'index-region';
            case 'categoryRegion':
                return 'category-region';
            case 'spinnerRegion':
                return 'spinner-region';
        }
    };
    
    RegionManager.prototype._addRegionToCache = function(regionName) {
        var cachedRegions = this._getCachedRegions();
        if (cachedRegions.indexOf(regionName) === -1) {
            cachedRegions.push(regionName);
        }
    };

    RegionManager.prototype.prepareRegionForRender = function(regionName) {

        var region;
        var mainLayout = this._getContextInstance();
        var layoutView = mainLayout.getView();

        var regionExists = this._ifRegionExists(regionName);
        var regionId = this.getRegionIdByName(regionName);
        var regionDOM = document.getElementById(regionId);

        if (regionDOM) {
            if (!regionExists) {
                this._addRegionToCache(regionName);
                layoutView.addRegion(regionName, '#' + regionId);
            }
        } else {
            regionDOM = document.createElement('div');
            regionDOM.id = regionId;
            $('#__CONTENT_CONTAINER__').append(regionDOM);
            this._addRegionToCache(regionName);
            region = layoutView.addRegion(regionName, '#' + regionId);
        }

//        this.hideContentRegions();
//        if (CoreUtils.isEmpty(region)) {
//            region = this._getContextInstance().getView()[regionName] || false;
//        }
//        if (region) {
//            region.$el.show();
//        }
    };
    
    RegionManager.prototype.showRegionByName = function(regionName) {
        var region = this._getContextInstance().getView()[regionName] || false;
        if (region) {
            region.$el.show();
        }
    };

    RegionManager.prototype.hideRegionByName = function(regionName) {
        var region = this._getContextInstance().getView()[regionName] || false;
        if (region) {
            region.$el.hide();
        }
    };
    
    RegionManager.prototype.hideContentRegions = function() {
        var cachedRegions = this._getCachedRegions();
        var me = this;
        _.each (cachedRegions, function(regionName){
            me.hideRegionByName(regionName);
        });
    };

    return RegionManager;
});