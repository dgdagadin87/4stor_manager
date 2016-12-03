"use strict";

define([
    'Application',
    'Chartist'
], function (
    Application,
    Chartist
) {
    var ChartManager = function(config) {

        if ( ! config) {
            throw new Error('Set config to ChartManager!');
        }

        if (!config.model) {
            throw new Error('Set model to ChartManager');
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

    ChartManager.prototype.drawColumn = function(svgElement) {
        
        var config = this._getConfig();
        var model = config.model;
        var data = model.get('chartData');
        var labels = model.get('labelData');
        var background = config.background;
        
        new Chartist.Bar(svgElement,
            {
                labels: labels,
                series: data
            },
            {
                distributeSeries: true,
                height: background.height
            }
        ).on('draw', function(data) {
            if(data.type === 'bar') {
                data.element.attr({style: 'stroke-width: 50px'});
            };
        });
    };

    ChartManager.prototype.drawCircle = function(canvasElement) {
        var config = this._getConfig();
        var model = config.model;
        var data = model.get('chartData');
        var total = model.get('total');
        var colors = model.get('colorData');
        var radius = config.radius;
        var background = config.background;
        var canvasId = config.canvasId;

        var centerWidth = background.width*.5;
        var centerHeight = background.height*.5;

        var canvas = canvasElement; 
        var c = canvas.getContext('2d'); 
        c.fillStyle = background.color; 
        c.fillRect(0, 0, background.height, background.width); 

        var prevAngle = 0; 
        for(var i = 0; i < data.length; i++) {
            
//            var sliceGradient = c.createRadialGradient( centerWidth, centerWidth, 1, centerWidth, centerWidth, radius );
//            sliceGradient.addColorStop( 0, '#eee' );
//            sliceGradient.addColorStop( 1, colors[i] );
            
            var fraction = data[i]/total; 
            var angle = prevAngle + fraction*Math.PI*2; 

            //c.fillStyle = sliceGradient;
            c.fillStyle = colors[i];

            c.beginPath(); 
            c.moveTo(centerWidth,centerHeight); 
            c.arc(centerWidth,centerHeight, radius, prevAngle, angle, false);
            c.lineTo(centerWidth,centerHeight);
            c.closePath();

            c.fill(); 

            c.strokeStyle = "white";
            c.lineWidth = 1;
            c.stroke(); 

            prevAngle = angle; 
        }
        
    };

    return ChartManager;
});