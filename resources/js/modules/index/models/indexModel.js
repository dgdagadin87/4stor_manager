"use strict";

define(
    [
        'underscore',
        'backbone',
        'backboneRelational',
        './storModel'
    ],
    function(
        _,
        Backbone,
        BackboneRelational,
        storModel
    ) {
        return Backbone.RelationalModel.extend({
            className : 'indexModel',
            defaults : {
                categoryId       : 0,
                categoryUrl      : '',
                categoryName     : '',
                categoryStors    : 0,
                stors: []
            },
            relations : [
                {
                    type : Backbone.HasMany,
                    key : 'stors',
                    relatedModel: storModel
                }
            ],
            initialize : function() {
                Backbone.RelationalModel.prototype.initialize.apply(this, arguments);
            }
        });
    }
);
