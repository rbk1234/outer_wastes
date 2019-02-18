

(function ($) {
    'use strict';

    Game.namespace('Effects').Database = {
        renew: {
            name: 'Renew (buff)',
            baseStats: {
                duration: 5,
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