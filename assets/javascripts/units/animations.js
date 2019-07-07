
(function ($) {
    'use strict';

    Game.namespace('Units').Animations = {
        cleric: {
            portrait: [
                '_O_',
                '/ \\'
            ],
            offset: 3,
            idle: {
                image: [
                    ' _O_',
                    ' /  .',
                    ' \\ \\|',
                    ' | )|',
                    '/__||'
                ]
            },
            attack: [
                {
                    image: [
                        ' _O_ .',
                        ' / \\_|',
                        ' \\   |',
                        ' | ) |',
                        '/__|'
                    ],
                    duration: 0.4
                }
            ],
            cast: [
                {
                    image: [
                        ' _O_ .',
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
                    ' _O_'
                ]
            }
        },
        swashbuckler: {
            portrait: [
                '~O',
                '/)\\'
            ],
            offset: 1,
            idle: {
                image: [
                    '  ~O',
                    '  /)\\',
                    '  \\+---',
                    '   |\\',
                    '  / |'
                ]
            },
            attack: [
                {
                    image: [
                        '  ~O',
                        '   \\',
                        '  /|\\+---',
                        '   |\\',
                        '  / |'
                    ],
                    duration: 0.3
                }
            ],
            cast: [
                {
                    image: [
                        '     |',
                        '  ~O |',
                        '   \\_+',
                        '  /|',
                        '   |\\',
                        '  / |',
                    ],
                    duration: 0.2
                },
                {
                    image: [
                        ' ---+',
                        '  ~O/',
                        '   /_/',
                        '   |',
                        '   |\\',
                        '  / |',
                    ],
                    duration: 0.1
                },
                {
                    image: [
                        '---+',
                        '  ~O)',
                        '   /_/',
                        '   |',
                        '   |\\',
                        '  / |',
                        ''
                    ],
                    duration: 0.1
                },
                {
                    image: [
                        '   _',
                        ',\'    `',
                        '        \\',
                        '  ~O',
                        '   \\     \'',
                        '  / X    \'',
                        '   |\\\\  /',
                        '  / | \\',
                    ],
                    duration: 0.2
                },
                {
                    image: [
                        '  ~O',
                        '   \\',
                        '  / X',
                        '   |\\\\',
                        '  / | \\',
                    ],
                    duration: 0.1
                },

            ],
            dead: {
                image: [
                    '~O'
                ]
            }
        },

        native: {
            portrait: [
                '\\|/',
                '(oo'
            ],
            offset: 3,
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
                    duration: 0.5
                }
            ],
            dead: {
                image: [
                    '(xx'
                ]
            }
        },

        brewmaster: {
            portrait: [
                ' _O',
                '/_ \\'
            ],
            offset: 2,
            idle: {
                image: [
                    '  _O',
                    ' /_ \\',
                    '((_)/',
                    '  | \\',
                    ' /  |'
                ]
            },
            attack: [
                {
                    image: [
                        '  _O',
                        ' |  \\_',
                        '  \\((_)',
                        '  | \\',
                        ' /  |'
                    ],
                    duration: 0.5
                }
            ],
            cast: [
                {
                    image: [
                        '   O  _',
                        '  \\ \\| |',
                        '  |`.|_|',
                        '  | \\',
                        ' /  |'
                    ],
                    duration: 0.2
                },
                {
                    image: [
                        '   __',
                        '  (_()',
                        '  |O|',
                        '  / /',
                        '  |_)',
                        '  | \\',
                        ' /  |'
                    ],
                    duration: 0.1
                },
                {
                    image: [
                        '  __',
                        ' (_()',
                        '  \\O\\',
                        '  / /',
                        '  |_)',
                        '  | \\',
                        ' /  |'
                    ],
                    duration: 0.1
                },
                {
                    image: [
                        '   _',
                        '     `',
                        '       \\',
                        '   O    \'',
                        '  | \\   |',
                        '   `.* _  ,',
                        '  | \\ | |*',
                        ' /  | *_|'
                    ],
                    duration: 0.2
                },
                {
                    image: [
                        '   O',
                        '  | \\',
                        '   `.` _',
                        '  | \\*| |',
                        ' /  | |_|*'
                    ],
                    duration: 0.2
                }
            ],
            dead: {
                image: [
                    ' _O'
                ]
            }
        },

        smuggler: {
            portrait: [
                '~O',
                '/v\\'
            ],
            offset: 3,
            idle: {
                image: [
                    '~O',
                    '/v\\_',
                    '+>  ',
                    ' |\\',
                    '/ |',
                ]
            },
            attack: [
                {
                    image: [
                        '~O',
                        ' \\',
                        '/|\\+>',
                        ' |\\',
                        '/ |',
                    ],
                    duration: 0.3
                }
            ],
            cast: [
                {
                    image: [
                        '~O',
                        '/v\\',
                        '+>/',
                        ' |\\',
                        '/ |',
                    ],
                    duration: 0.4
                },
                {
                    image: [
                        '~O',
                        '/v\\_╔═',
                        '+>',
                        ' |\\',
                        '/ |',
                    ],
                    duration: 0.4
                },
                {
                    image: [
                        '~O',
                        '/v\\_╔═*',
                        '+>',
                        ' |\\',
                        '/ |',
                    ],
                    duration: 0.1
                },
                {
                    image: [
                        '    ',
                        '~O ╚ `',
                        '/v\\/  \'',
                        '+>',
                        ' |\\',
                        '/ |',
                    ],
                    duration: 0.25
                },
                {
                    image: [
                        '~O ╚',
                        '/v\\/',
                        '+>',
                        ' |\\',
                        '/ |',
                    ],
                    duration: 0.15
                },
                {
                    image: [
                        '~O',
                        '/v\\',
                        '+>/',
                        ' |\\',
                        '/ |',
                    ],
                    duration: 0.3
                }

            ],
            dead: {
                image: [
                    '~O'
                ]
            }
        },
        crusader: {
            portrait: [
                '~O',
                '/)\\'
            ],
            offset: 1,
            idle: {
                image: [
                    '    O__',
                    '   /)\\|',
                    '  | |\\/',
                    '  : |\\',
                    '  */ |'
                ]
            },
            attack: [
                {
                    image: [
                        '    O__',
                        '  |\\)\\|',
                        '  : |\\/',
                        '  * |\\',
                        '   / |'
                    ],
                    duration: 0.2
                },
                {
                    image: [
                        ' :\\ O__',
                        ' * \\)\\|',
                        '    |\\/',
                        '    |\\',
                        '   / |'
                    ],
                    duration: 0.2
                },
                {
                    image: [
                        '    _',
                        ',\'    `  ',
                        '        \\',
                        '    O__  ',
                        '    \\\\|  \'',
                        '    |`-··*',
                        '    |\\',
                        '   / |'
                    ],
                    duration: 0.2
                },
                {
                    image: [
                        '    O__',
                        '    \\\\|',
                        '    |`-··*',
                        '    |\\',
                        '   / |'
                    ],
                    duration: 0.2
                }
            ],
            //cast: [
            //    {
            //        image: [
            //            '      __',
            //            '    O ,|',
            //            '   /)/\\/',
            //            '  | |',
            //            '  : |\\',
            //            '  */ |',
            //        ],
            //        duration: 1
            //    }
            //],
            dead: {
                image: [
                    '~O'
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
                    '.............'
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
                    '.......'
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
                    ' ...'
                ]
            }
        },
        bear: {
            portrait: [
                ' /. 7',
                '/,   ',
                '`^^/ '
            ],
            portraitFontSize: 0.75,
            width: 2,
            idle: {
                image: [
                    '     ___,-~~~----..  ',
                    '   /. 7    ;  ;  ; \\ ',
                    '  /,       ;   ;   )',
                    '  `^^/\\  \\_;~~~\\,  \\\'',
                    '   _/ /| |    | /\\` \\',
                    '   ((`((-`   ((-`((-`',
                ]
            },
            attack: [
                {
                    image: [
                        '   ___,-~~~----..  ',
                        ' /. 7    ;  ;  ; \\ ',
                        '/,        ;   ;   )',
                        '`^^/\\  \\_;~~~\\,  \\\'',
                        ' _/ /| |    | /\\` \\',
                        ' ((`((-`   ((-`((-`',
                    ],
                    duration: 0.2
                },
            ],
            dead: {
                image: [
                    '.............'
                ]
            }
        },
        bearCub: {
            portrait: [
                '..7',
                '`~ '
            ],
            idle: {
                image: [
                    ' ..7-~~.  ',
                    ' `~ .__ \\`',
                    '  ,\\\\ ,\\\\ ',
                ]
            },
            attack: [
                {
                    image: [
                        '..7-~~.  ',
                        '`~ .__ \\`',
                        ' ,\\\\ ,\\\\ ',
                    ],
                    duration: 0.2
                }
            ],
            dead: {
                image: [
                    '.......'
                ]
            }
        }





    };

}(jQuery));