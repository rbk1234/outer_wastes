
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
                    duration: 0.25
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
            health: 500,
            height: 5,
            attackSpeed: 0.3,
            attackDamage: 10,
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
                    duration: 0.25
                },
                dead: {
                    image: [
                        '',
                        '',
                        '.......'
                    ]
                }
            },
            health: 100,
            height: 3,
            attackSpeed: 2,
            attackDamage: 10,
            reward: 50
        },
        3: {

        }

    };

}(jQuery));