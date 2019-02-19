

(function ($) {
    'use strict';

    Game.namespace('Effects').Database = {
        renew: {
            name: 'Renew',
            icon: 'healing',
            background: 'green',
            baseStats: {
                duration: 6,
                period: 1
            },
            events: {
                onTick: function(target, effectSource) {
                    target.addHealth(10, effectSource)
                }
            }
        },

        shield: {
            name: 'Shield',
            icon: 'shield',
            background: 'sunny',
            baseStats: {
                duration: 6,
                absorbAmount: 50
            },
            events: {

            },
        }

    };

}(jQuery));