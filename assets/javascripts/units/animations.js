
(function ($) {
    'use strict';

    Game.namespace('Units').Animations = {
        player: {
            portrait: [
                '┌[)',
                '/+\\'
            ],
            offset: 1,
            idle: {
                image: [
                    '┌[) ',
                    '/+\\ ',
                    '\\/={',
                    ' |\\ ',
                    '/ | '
                ]
            },
            attack: [
                {
                    image: [
                        '┌[)',
                        '/+\\ /',
                        '\\/={~',
                        ' |\\ \\',
                        '/ |  '
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
                    '┌[)'
                ]
            }
        },
        swashbuckler: {
            portrait: [
                '┌[)',
                '/ \\'
            ],
            offset: 1,
            idle: {
                image: [
                    '┌[)  ',
                    '/ \\  ',
                    '\\/==>',
                    ' |\\  ',
                    '/ |  ',
                ]
            },
            attack: [
                {
                    image: [
                        '┌[)  ',
                        '/ \\  ',
                        '\\/==>*',
                        ' |\\  ',
                        '/ |  ',
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
                    '┌[)'
                ]
            }
        },

        native: {
            portrait: [
                '┌[)',
                '/X\\'
            ],
            offset: 1,
            idle: {
                image: [
                    '┌[)',
                    '/X\\_',
                    '\\/==[',
                    ' |\\',
                    '/ |'
                ]
            },
            attack: [
                {
                    image: [
                        '┌[)',
                        '/X\\_ /,*',
                        '\\/==[~`.*',
                        ' |\\  *\\`',
                        '/ |'
                    ],
                    duration: 0.5
                }
            ],
            dead: {
                image: [
                    '',
                    '',
                    '',
                    '',
                    '',
                    '┌[)'
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
                ' Λ7',
                '(-`'
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