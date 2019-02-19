
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
            icon: 'hand-bandage',
            background: 'pink',
            requiresTarget: true,
            baseStats: {
                manaCost: 20,
                cooldown: 0,
                castTime: 2
            },
            events: {
                onCastComplete: function(caster, target) {
                    target.addHealth(50, caster);
                }
            }
        },

        renew: {
            name: 'Renew',
            icon: 'healing',
            background: 'green',
            requiresTarget: true,
            baseStats: {
                manaCost: 20,
                cooldown: 0,
                castTime: 0
            },
            events: {
                onCastComplete: function (caster, target) {
                    caster.castEffectOnTarget('renew', target);
                }
            }
        },

        shield: {
            name: 'Shield',
            icon: 'shield',
            background: 'sunny',
            requiresTarget: true,
            baseStats: {
                manaCost: 30,
                cooldown: 8,
                castTime: 0
            },
            events: {
                onCastComplete: function (caster, target) {
                    caster.castEffectOnTarget('shield', target);
                }
            }
        }
    };



}(jQuery));