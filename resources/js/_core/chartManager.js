"use strict";

define([
    'Application'
], function (
    Application
) {
    var ChartManager = function(config) {

        if ( ! config) {
            throw new Error('Set config to ChartManager!');
        }

        if (!config.data) {
            throw new Error('Set data to ChartManager');
        }
        
        if (!config.colors) {
            throw new Error('Set colors to ChartManage!');
        }
        
        if (config.colors.length !== config.data.length) {
            throw new Error('Color and data conflict');
        }
        
        if (!config.radius) {
            throw new Error('Set radius to ChartManager');
        }
        
        if (!config.background) {
            throw new Error('Set background to ChartManager');
        }
        
        if (!config.canvasId) {
            throw new Error('Set canvas ID tag to ChartManager');
        }

        this._config = config;
    };

    ChartManager.prototype._getConfig = function() {
        return this._config;
    };

    ChartManager.prototype.drawCircle = function() {
        var config = this._getConfig();
        var data = config.data;
        var colors = config.colors;
        var radius = config.radius;
        var background = config.background;
        var canvasId = config.canvasId;
        
        var canvas = document.getElementById(canvasId); 
        var c = canvas.getContext('2d'); 
        c.fillStyle = background.color; 
        c.fillRect(0, 0, background.height, background.width); 
        
        var total = 0; 
        for(var i=0; i<data.length; i++) { 
            total += data[i]; 
        }
        
        var prevAngle = 0; 
            for(var i = 0; i < data.length; i++) {
            var fraction = data[i]/total; 
            var angle = prevAngle + fraction*Math.PI*2; 

            c.fillStyle = colors[i]; 

            c.beginPath(); 
            c.moveTo(250,250); 
            c.arc(250,250, radius, prevAngle, angle, false); 
            c.lineTo(250,250); 

            c.fill(); 

            c.strokeStyle = "white"; 
            c.stroke(); 

            prevAngle = angle; 
        }
    };

    return ChartManager;
});