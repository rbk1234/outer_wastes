/* Handles resources and resource generation */
/* Singleton */

(function ($) {
    'use strict';

    var UPDATES_PER_SECOND = 1;

    var ResourceEngine = function() {};

    ResourceEngine.prototype = {

        init: function() {
            this._resources = {
                ore: {
                    name: 'Ore',
                    amount: 20,
                    rate: 1
                }
            };

            Game.Clock.setInterval(
                'updateResources',
                Game.Util.makeCallback(this, this._update),
                1.0 / UPDATES_PER_SECOND
            );
        },

        _update: function(iterations, seconds) {
            Game.Util.iterateObject(this._resources, function(key, resource) {
                resource.amount += resource.rate * seconds;
            });
        },

        add: function(key, amount) {
            this._resources[key].amount += amount;
        }

    };

    Game.ResourceEngine = new ResourceEngine();

}(jQuery));