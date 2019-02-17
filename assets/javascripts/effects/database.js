

(function ($) {
    'use strict';

    Game.namespace('Effects').Database = {
        1: {
            name: 'Shield',
            iconClass: 'vibrating-shield',
            type: 'absorption',
            animation: 'TODO',
            amount: 100,
            duration: 10
        },

        renew: {
            name: 'Renew (buff)',
            duration: 5,
            period: 1,
            onTick: function(unit) {
                unit.addHealth(10)
            }

        }
    };

}(jQuery));