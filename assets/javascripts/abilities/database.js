
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
        }
    };



}(jQuery));