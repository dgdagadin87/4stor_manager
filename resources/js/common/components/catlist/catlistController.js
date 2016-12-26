"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    '_base/BaseController',
    'settings',
    'common/components/catlist/views/catlistView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    BaseController,
    Settings,
    catlistView
) {
    var catlistController = function() {
        
        BaseController.call(this);

        this._view = new catlistView();
        
        this._init();
        this._bindEvents();
    };
    
    catlistController.prototype = Object.create(BaseController.prototype);
    
    catlistController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
        Application.on('category:setactive', this._setActiveCategory.bind(this));
    };
    
    catlistController.prototype._init = function() {
    };
    
    catlistController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    catlistController.prototype._setActiveCategory = function() {
        var params = CoreUtils.getURIParams();
        var rootParam = params[0] || 'main';
        var secParam  = params[1] || 0;
        $('.category-list-item').removeClass('active');
        if (rootParam === 'category') {
            $.each($('.catlist-item'), function(key, item){
                var current = $(item);
                var href = current.attr('href');
                var hrefArray = href.split('/');
                var curCatId = hrefArray[2] || 0;
                if (curCatId == secParam) {
                    current.parent().addClass('active');
                    return false;
                }
            });
        }
    };

    catlistController.prototype.renderView = function() {
        this.getView().render();
    };
    
    catlistController.prototype.showCategoryList = function(paData) {
        if (!this.isComponentRendered()) {
            var view = this.getView();
            var mainLayout = Application.getMainLayout();
            view.collection.set(paData);
            mainLayout.getView().showChildView('leftRegion', view);
        }
        Application.trigger('category:setactive');
    };

    return catlistController;
});