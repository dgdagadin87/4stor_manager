"use strict";

define(['underscore','jquery'], function(_,$) {

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
            case 'index':
            default:
                return 'index-region';
            case 'storelist':
                return 'storelist-region';
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
                return (true);
            }
        } else {
            regionDOM = document.createElement('div');
            regionDOM.id = regionId;
            $('#__CONTENT_CONTAINER__').append(regionDOM);
            region = layoutView.addRegion(regionName, '#' + regionId);
            return (true);
        }
    };

    RegionManager.prototype.hideRegionByName = function(regionName) {
        var region = this._getContextInstance().getView()[regionName] || false;
        if (region) {
            region.$el.hide();
        }
    };
    
//    RegionManager.prototype.showRegionByName = function(regionName, viewName) {
//        var region = this._getRegionsFromContextInstance(regionName),
//            cachedView = this._getViewByNameInCache(viewName);
//        if (region) {
//            region.$el.show();
//            if (cachedView) {
//                region.show(cachedView);
//            }
//        }
//    };

    return RegionManager;
});