

(function ($) {
    'use strict';

    Game.namespace('Effects').Database = {
        renew: {
            name: 'Renew (buff)',
            onTick: function(unit) {
                unit.addHealth(10)
            },
            baseStats: {
                duration: 5,
                period: 1
            }
        }
    };

}(jQuery));