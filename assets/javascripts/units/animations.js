
(function ($) {
    'use strict';

    Game.namespace('Units').Animations = {
        player: {
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
            attack: [
                {
                    image: [
                        ' _O_ $',
                        ' / \\_|',
                        ' \\   |',
                        ' | ) |',
                        '/__|'
                    ],
                    duration: 0.4
                }
            ],
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
        swashbuckler: {
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
            attack: [
                {
                    image: [
                        '~O',
                        ' \\',
                        '/|\\+---',
                        ' |\\',
                        '/ |'
                    ],
                    duration: 0.3
                }
            ],
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

        native: {
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
            attack: [
                {
                    image: [
                        '  \\|/',
                        '  (oo     _',
                        '  |  \\ _-=',
                        '  \\ _-=',
                        ' _-=\\',
                        '= / |'
                    ],
                    duration: 0.4
                }
            ],
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





        oozeling: {
            idle: {
                image: [
                    '  00.',
                    ' .oOOoo.',
                    'oo000oOOoo'
                ]
            },
            attack: [
                {
                    image: [
                        '00.',
                        '.oOOoo.',
                        'oo000oOOoo'
                    ],
                    duration: 0.2
                }
            ],
            dead: {
                image: [
                    '',
                    '',
                    '.......'
                ]
            }
        },
        wolf: {
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
            attack: [
                {
                    image: [
                        ' _',
                        "''(__",
                        ' \\\\ \\\\`'
                    ],
                    duration: 0.2
                }
            ],
            dead: {
                image: [
                    '',
                    '',
                    '.......'
                ]
            }
        },
        direWolf: {
            portrait: [
                '_.^',
                '`-\\'
            ],
            width: 2,
            idle: {
                image: [
                    ' _.^\\',
                    ' `-\\  `~~~._',
                    '    \'\\ ,___ _\\,,;',
                    '     ,||\' `||'
                ]
            },
            attack: [
                {
                    image: [
                        '_.^\\',
                        '`-\\  `~~~._',
                        '   \'\\ ,___ _\\,,;',
                        '    ,||\' `||'
                    ],
                    duration: 0.2
                }
            ],
            dead: {
                image: [
                    '','','','.............'
                ]
            }
        },
        spider: {
            portrait: [
                '....',
                '\\oo/'
            ],
            idle: {
                image: [
                    '   _...._',
                    '  //\\oo/\\\\',
                    ' //  \'\'  \\\\'
                ]
            },
            attack: [
                {
                    image: [
                        '  _...._',
                        ' //\\oo/\\\\',
                        '//  \'\'  \\\\'
                    ],
                    duration: 0.2
                }
            ],
            dead: {
                image: [
                    '','','','.......'
                ]
            }
        },
        forestGoblin: {
            portrait: [
                '',
                ' Λ7'
            ],
            idle: {
                image: [
                    '    Λ7',
                    '  -(-`',
                    '   / \\'
                ]
            },
            attack: [
                {
                    image: [
                        '    Λ7',
                        ' - ( \\',
                        '   / \\'
                    ],
                    duration: 0.1
                },
                {
                    image: [
                        '    Λ7',
                        '-  ( \\',
                        '   / \\'
                    ],
                    duration: 0.1
                },
                {
                    image: [
                        '    Λ7',
                        '   ( \\',
                        '   / \\'
                    ],
                    duration: 0.5
                }
            ],
            dead: {
                image: [
                    '','','',' ...'
                ]
            }
        }




    };

}(jQuery));