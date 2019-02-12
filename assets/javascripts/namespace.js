/*
* Namespace all of our variables under a single global `Game`.
*
* To create a sub-namespace called 'Abilities':
*
*   `Game.namespace('Abilities')`
*
* This will create a javascript object that can be accessed from anywhere in the code using:
*
*   `Game.Abilities`
*
* */

var Game = { // jshint ignore:line
    namespace: function (namespace) {
        'use strict';
        var parts   = namespace.split("."),
            object  = this,
            i, len;

        for(i=0, len=parts.length; i < len; i++) {
            if(!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }

        return object;
    }
};