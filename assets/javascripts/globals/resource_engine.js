/* Handles resources and resource generation */
/* Singleton */

(function ($) {
    'use strict';

    var CLOCK_KEY = 'ResourceEngine';
    var UPDATES_PER_SECOND = 1;

    var ResourceEngine = function() {};

    ResourceEngine.prototype = {

        init: function() {
            var self = this;

            this._resources = {
                gold: {
                    name: 'Gold',
                    amount: 0,
                    rate: 1
                }
            };

            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                self._incrementResouces(iterations * period);
            }, 1.0 / UPDATES_PER_SECOND);
        },

        saveData: function() {
            var data = {};

            Game.Util.iterateObject(this._resources, function(key, resourceData) {
                data[key] = resourceData.amount;
            });

            return data;
        },
        loadData: function(data) {
            if (data === undefined) {
                return;
            }

            Game.Util.iterateObject(this._resources, function(key, resourceData) {
                if (data[key] !== undefined) {
                    resourceData.amount = data[key];
                }
            });
        },

        _incrementResouces: function(seconds) {
            Game.Util.iterateObject(this._resources, function(key, resource) {
                resource.amount += resource.rate * seconds;
            });
        },

        add: function(key, amount) {
            this._resources[key].amount += amount;
        },

        getAmount: function(key) {
            return this._resources[key].amount;
        }

    };

    Game.ResourceEngine = new ResourceEngine();

}(jQuery));