
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
            manaCost: 20,
            cooldown: 0,
            castTime: 2,
            requiresTarget: true,
            onCastComplete: function(caster, target) {
                target.addHealth(50);
            }
        },

        renew: {
            name: 'Renew',
            manaCost: 20,
            cooldown: 0,
            castTime: 1,
            requiresTarget: true,
            onCastComplete: function(caster, target) {
                var effect = new Game.Effects.Effect('renew', caster, target);
                target.addEffect(effect);
            }
        }
    };



}(jQuery));