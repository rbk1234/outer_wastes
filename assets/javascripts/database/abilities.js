
(function ($) {
    'use strict';

    Game.namespace('Database').Abilities = {
        1: {
            name: 'Shield',
            iconClass: 'vibrating-shield',
            energyCost: 20,
            cooldown: 10,
            casterEffects: [1],
            targetEffects: []
        }
    };

    //Game.namespace('Database').EnemyAbilities = {
    //
    //};

    // todo move this to another file:

    Game.namespace('Database').Effects = {
        1: {
            name: 'Shield',
            iconClass: 'vibrating-shield',
            type: 'absorption',
            animation: 'TODO',
            amount: 100,
            duration: 10
        }
    };

}(jQuery));