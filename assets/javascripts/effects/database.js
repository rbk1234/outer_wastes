

(function ($) {
    'use strict';

    Game.namespace('Effects').Database = {
        renew: {
            name: 'Renew',
            baseStats: {
                duration: 6,
                period: 1
            },
            events: {
                onTick: function(unit) {
                    unit.addHealth(10)
                }
            }
        }
    };

}(jQuery));