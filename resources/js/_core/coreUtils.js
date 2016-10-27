"use strict";

define([
    'underscore',
    'backbone', 
    'jquery'
], function (
    _,
    Backbone,
    $
) {
    return {
        addRegionToMainView: function(poMainLayout, regionName, regionId, view) {
            var region = this.regions[regionName];
            var regionDOM = document.getElementById(regionId);
            if (regionDOM) {
                if (!region) {
                    region = poMainLayout.addRegion(name, '#' + regionId);
                }
                region.show(view);
            } else {
                regionDOM = document.createElement('div');
                regionDOM.id = regionId;
                this.$el.append(regionDOM);
                region = this.addRegion(name, '#' + regionId);
                region.show(view);
            }
        }
    }
});