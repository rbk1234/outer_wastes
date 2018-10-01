
(function ($) {
    'use strict';

    Game.namespace('Database').Units = {
        1: {
            name: 'Player',
            animations: {
                idle: {
                    image: [
                        ' [)  ',
                        '/ \\  ',
                        '\\==;>',
                        ' |\\  ',
                        '/ |  '
                    ]
                },
                attack: {
                    image: [
                        ' [)  ',
                        '/ \\  ',
                        '\\==;>*',
                        ' |\\  ',
                        '/ |  '
                    ],
                    duration: 0.1
                },
                dead: {
                    image: [
                        '',
                        '',
                        '',
                        '',
                        ' [)'
                    ]
                }
            },
            maxHealth: 400,
            maxEnergy: 100,
            energyRegen: 10,
            height: 5,
            attackSpeed: 0.2,
            attackDamage: 5
        },
        2: {
            name: 'oozeling',
            animations: {
                idle: {
                    image: [
                        '  00.',
                        ' .oOOoo.',
                        'oo000oOOoo'
                    ]
                },
                attack: {
                    image: [
                        '00.',
                        '.oOOoo.',
                        'oo000oOOoo'
                    ],
                    duration: 0.2
                },
                dead: {
                    image: [
                        '',
                        '',
                        '.......'
                    ]
                }
            },
            maxHealth: 400,
            height: 3,
            attackSpeed: 1,
            attackDamage: 15,
            reward: 50
        },
        3: {

        }

    };

}(jQuery));