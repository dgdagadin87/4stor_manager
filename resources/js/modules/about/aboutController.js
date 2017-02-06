"use strict";

define([
    'underscore',
    'backbone', 
    'jquery',
    'coreUtils',
    'Application',
    'settings',
    '_base/BaseModule',
    'modules/about/views/aboutView'
], function (
    _,
    Backbone,
    $,
    CoreUtils,
    Application,
    Settings,
    BaseModule,
    aboutView
) {
    var aboutController = function(poConfig) {
        
        var loConfig = poConfig || {};
        this._regionName = loConfig.regionName;
        
        BaseModule.call(this);
        
        this._pageTitle = 'О программе';
        this._moduleCode = 'about';

        this._breadCrumbs = [
            {
                isMain: true,
                name: 'Главная страница',
                url: ''
            },
            {
                isMain: false,
                name: 'О программе',
                url: 'about'
            }
        ];
        
        this._pageMeta = {
            pageTitle: 'О программе',
            pageCode: 'about'
        };

        this._view = new aboutView();
        
        this._init();
        this._bindEvents();
    };
 
    aboutController.prototype = Object.create(BaseModule.prototype);
    
    aboutController.prototype._bindEvents = function() {
        this._view.on('render', this._onViewRendered.bind(this));
    };
    
    aboutController.prototype._init = function() {
    };
    
    aboutController.prototype._onViewRendered = function() {
        this.setComponentRendered(true);
    };

    aboutController.prototype.showCurrentContent = function() {
        var me = this;
        var mainLayout = Application.getMainLayout();
        var layoutView = mainLayout.getView();
        var lfRender = function(){
            me.__renderContent();
            if (!me.isComponentRendered()) {
                layoutView[me._regionName].show(me.getView());
            }
        };
        lfRender();
    };

    aboutController.prototype.renderView = function() {
        this.getView().render();
    };

    return aboutController;
});