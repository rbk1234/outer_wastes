
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
            stats: {
                maxHealth: 100,
                maxMana: 250,
                manaRegen: 5,
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
            stats: {
                maxHealth: 500,
                attackSpeed: 0.6,
                attackDamage: 20,
                reward: 50
            }
        },
        wolf: {
            name: 'Wolf',
            stats: {
                maxHealth: 300,
                attackSpeed: 0.8,
                attackDamage: 10,
                reward: 10
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
            stats: {
                maxHealth: 400,
                attackSpeed: 0.5,
                attackDamage: 20,
                reward: 50
            }
        }

    };

}(jQuery));