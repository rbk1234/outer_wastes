
(function ($) {
    'use strict';

    Game.namespace('Database').Units = {
        1: {
            name: 'Player',
            animations: {
                idle: {
                    image: [
                        '~O',
                        '/ \\',
                        '\\+---',
                        ' |\\',
                        '/ |'
                    ]
                },
                attack: {
                    image: [
                        '~O',
                        ' \\',
                        '/|\\+---',
                        ' |\\',
                        '/ |'
                    ],
                    duration: 0.4
                },
                dead: {
                    image: [
                        '',
                        '',
                        '',
                        '',
                        '~O'
                    ]
                }
            },
            maxHealth: 100,
            maxEnergy: 100,
            energyRegen: 10,
            attackSpeed: 1,
            attackDamage: 10
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
            maxHealth: 100,
            attackSpeed: 1,
            attackDamage: 20,
            reward: 50
        },
        3: {

        }

    };

}(jQuery));