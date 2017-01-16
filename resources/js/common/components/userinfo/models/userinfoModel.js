"use strict";

define(
    ['backbone'],function(Backbone) {
        return Backbone.Model.extend({
            className : 'userinfoModel',
            defaults : {
                userName  : '',
                userLogin : ''
            }
        });
    }
);
