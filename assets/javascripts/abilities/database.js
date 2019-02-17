
(function ($) {
    'use strict';

    Game.namespace('Abilities').Database = {
        //1: {
        //    name: 'Shield',
        //    iconClass: 'vibrating-shield',
        //    manaCost: 20,
        //    cooldown: 10,
        //    casterEffects: [1],
        //    targetEffects: []
        //},

        heal: {
            name: 'Heal',
            requiresTarget: true,
            onCastComplete: function(caster, target) {
                target.addHealth(50);
            },
            baseStats: {
                manaCost: 20,
                cooldown: 0,
                castTime: 2
            }
        },

        renew: {
            name: 'Renew',
            requiresTarget: true,
            onCastComplete: function (caster, target) {
                caster.castEffectOnTarget('renew', target);
            },
            baseStats: {
                manaCost: 20,
                cooldown: 0,
                castTime: 1
            }
        }
    };



}(jQuery));