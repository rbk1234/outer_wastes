

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
                onTick: function(target, caster) {
                    target.addHealth(10, caster)
                }
            }
        }
    };

}(jQuery));