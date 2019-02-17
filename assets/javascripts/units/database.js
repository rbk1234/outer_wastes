
(function ($) {
    'use strict';

    Game.namespace('Units').Database = {
        player: {
            name: 'Healer (You)',
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
            baseStats: {
                maxHealth: 100,
                maxMana: 100,
                manaRegen: 10,
                attackSpeed: 1,
                attackDamage: 5
            }
        },
        oozeling: {
            name: 'Oozeling',
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
            baseStats: {
                maxHealth: 150,
                attackSpeed: 0.75,
                attackDamage: 10,
                reward: 50
            }
        },
        native: {
            name: 'Native',
            animations: {
                idle: {
                    image: [
                        ' \\|/ /',
                        ' (oo/',
                        ' / /\\',
                        ' \\/ /',
                        ' /|\\',
                        '// |'
                    ]
                },
                attack: {
                    image: [
                        '  \\|/',
                        '  (oo     _',
                        '  |  \\ _-=',
                        '  \\ _-=',
                        ' _-=\\',
                        '= / |'
                    ],
                    duration: 0.4
                },
                dead: {
                    image: [
                        '',
                        '',
                        '',
                        '',
                        ' \\|/',
                        ' (oo'
                    ]
                }
            },
            baseStats: {
                maxHealth: 200,
                attackSpeed: 0.25,
                attackDamage: 50,
                reward: 50
            }
        }

    };

}(jQuery));