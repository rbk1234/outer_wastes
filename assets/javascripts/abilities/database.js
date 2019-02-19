
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
            description: 'Heals a friendly target for 50.',

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
            description: 'Heals a friendly target for 100 over 10 seconds.',

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
            description: 'Shields a friendly target for 6 seconds, absorbing up to 50 damage.',

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