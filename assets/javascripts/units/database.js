
(function ($) {
    'use strict';

    Game.namespace('Units').Database = {
        player: {
            name: 'Healer (You)',
            animations: {
                portrait: [
                    '_O_',
                    '/ \\'
                ],
                idle: {
                    image: [
                        ' _O_',
                        ' /  $',
                        ' \\ \\|',
                        ' | )|',
                        '/__||'
                    ]
                },
                attack: {
                    image: [
                        ' _O_ $',
                        ' / \\_|',
                        ' \\   |',
                        ' | ) |',
                        '/__|'
                    ],
                    duration: 0.4
                },
                dead: {
                    image: [
                        '',
                        '',
                        '',
                        '',
                        ' _O_'
                    ]
                }
            },
            stats: {
                maxHealth: 100,
                maxMana: 200,
                manaRegen: 3,
                attackSpeed: 0.3,
                attackDamage: 5
            }
        },
        swashbuckler: {
            name: 'Swashbuckler',
            animations: {
                portrait: [
                    '~O',
                    '/ \\'
                ],
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
                    duration: 0.3
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
                maxHealth: 200,
                attackSpeed: 1.25,
                attackDamage: 10
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
            animations: {
                portrait: [
                    ' _',
                    "''("
                ],
                idle: {
                    image: [
                        '  _',
                        " ''(__",
                        '  \\\\ \\\\`'
                    ]
                },
                attack: {
                    image: [
                        ' _',
                        "''(__",
                        ' \\\\ \\\\`'
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
                maxHealth: 300,
                attackSpeed: 0.8,
                attackDamage: 10,
                reward: 10
            }
        },
        native: {
            name: 'Native',
            animations: {
                portrait: [
                    '\\|/',
                    '(oo'
                ],
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