
Game.namespace('UI').Doodads = {

    road_ground: {
        image: [
            '                    _      -          _                                                                    _        -',
            '_     .      `                                    `         -      -       _        -      `       `',
            '',
            '',
            '                                _      ·       _                                         _      ·        _        ·',
            '    -    `      -      `                                  `        ·    -     ·                                        `'

        ],
        fills: [
            '                    r      r          r                                                                    r        r',
            'r     r      r                                    r         r      r       r        r      r       r',
            '',
            '',
            '                                r      r       r                                         r      r        r        r',
            '    r    r      r      r                                  r        r    r     r                                        r',
        ],
        colors: {
            r: 'brown'
        }
    },
    road_hill1: {
        image: [
            '     _.-`¯¯`-.._',
            '..-`¯      --.  ¯¯`--..',
        ],
        fills: [
            '     hhhhhhhhhhh',
            'hhhhh      hhh  hhhhhhh',
        ],
        colors: {
            h: 'green'
        }
    },
    road_hill2: {
        image: [
            '         _,._',
            '    _.-·`,   `·.',
            '.--`   ·\'       `·.',
        ],
        fills: [
            '         hhhh',
            '    hhhhhh   hhh',
            'hhhh   hh       hhh',
        ],
        colors: {
            h: 'green'
        }
    },
    road_hill3: {
        image: [
            '           _·;`¯`·._',
            '     ,,·-\'¯     `·_  `-·._',
            '..-\'\'                     `··-._',
        ],
        fills: [
            '           hhhhhhhhh',
            '     hhhhhh     hhh  hhhhh',
            'hhhhh                     hhhhhh',
        ],
        colors: {
            h: 'green'
        }
    },
    road_fence1: {
        image: [
            '__         __',
            '||-·-·T·---||',
            '||    |    ||',
            '||____._.__||',
            '||    |    ||',
        ]
    },
    road_fence2: {
        image: [
            '__',
            '||-.          _',
            '||  ¯`-x._   //',
            '||__-_/   `-//',
            '||   / ``-.//',
        ]
    },







    tavernSecondFloor: {
        image: [
            '                                   ·-·-=====================================-·-·',
            '                                 ·\'·\'|                  | |           - | |  |`·`·',
            '                               ·\'·\'  |                  | | =     _     | |  |  `·`·',
            '                             ·\'·\'    |                  | |             | |  |    `·`·',
            '                           ·\'·\'      |                  | |        =    | |  |      `·`·',
            '                         ·\'·\'        |      _____       | |    -        | |  |        `·`·',
            '                         | |         |    ·\' - -        | |      _      | |  |         | |',
            '                         | |         |  ·\'    __________| | =        -= | |__|         | |',
            '                         | |       ·\' ·\'   __/ /         \\|   __      _ |/    `·       | |',
            '                         | |     ·\' ·\'  __/ / /                                 `·     | |',
            '                         | |   ·|¯T¯T¯T¯T¯T¯T¯T¯|                                 `·   | |',
            '                         | | ·\'                                                     `· | |',
            '                         |_|\'                                                         `|_|',
            '                        ·-·-===========================================================-·-·',
        ]
    },
    tavernFirstFloor: {
        image: [
            '========================================================================================================================',
            '             `·.   ||   .·`                        `·.   ||   .·`                        `·.   ||   .·`               `·',
            '________________`·.||.·`______________________________`·.||.·`______________________________`·.||.·`____________________',
            '   |              ·||                    =               ||                    =               ||',
            '   |            ·\' ||          =                         ||      -                             ||      -',
            '   |   =      ·\' _|||                                    ||                                    ||',
            '   |        ·\' _|  ||                                    ||           =                        ||            =',
            '   |______·\' _|    ||                                    ||                                    ||   ·',
            '   / -  -  _|      ||                                    ||                                    ||',
            '  /|______|        ||                                    ||                                    ||',
            ' /|______||        ||                                    ||                                    ||',
            '/|______| |     -  ||                                    ||                                    ||',
            '|______|  |        ||                                    ||                                    ||',
            '______|  ·\'',
            '_____|·\'',
        ],
        fills: [
            'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            '             BBB   BB   BBB                        BBB   BB   BBB                        BBB   BB   BBB               BB',
            'bbbbbbbbbbbbbbbbBBBBBBBBbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbBBBBBBBBbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbBBBBBBBBbbbbbbbbbbbbbbbbbbbb',
            '   B              rBB                    g               BB                    g               BB',
            '   B            rr BB          g                         BB      g                             BB      g',
            '   B   g      rr ggBB                                    BB                                    BB',
            '   B        rr gg  BB                                    BB           g                        BB            g',
            '   Brrrrrrrr gg    BB                                    BB                                    BB   g',
            '   r r  r  gg      BB                                    BB                                    BB',
            '  rrggggggg        BB                                    BB                                    BB',
            ' rrgggggggg        BB                                    BB                                    BB',
            'rrggggggggg     g  BB                                    BB                                    BB',
            'rgggggggggg        BB                                    BB                                    BB',
            'gggggggggg',
            'gggggggg',
        ],
        colors: {
            B: 'darkbrown',
            b: 'beige',
            r: 'grey',
            g: 'grey'
        }
    },
    tavernTableLarge: {
        image: [
            '                         ._.',
            ' .                       |O|',
            ' |O _____________________/|\\____   .',
            ' |\\_[]          <>    [] ` \'    \\ O|',
            ' |/     _O  ()            <>   []_/|',
            ' /_____|  \\,______________________\\|',
            '  ||   |__|-                   /|| |',
            '  ||   |  ||                    ||',
        ],
        fills: [
            '                         ccc',
            ' c                       cOc',
            ' cO ttttttttttttttttttttt/|\\tttt   c',
            ' c\\_bb          <>    bb ` \'    t Oc',
            ' ct     cO  bb            <>   bb_/c',
            ' ttttttccc\\,tttttttttttttttttttttttc',
            '  tt   cccc-                   /tt c',
            '  tt   c  c|                    tt',
        ],
        colors: {
            c: 'grey',
            t: 'darkbrown',
            b: 'brown'
        },
        advMouseovers: {
            area: [
                '                         CCC',
                ' AAA                     CCC',
                ' AAA_____________________CCC____ DDD',
                ' AAAA]          <>    [] CCC    \\DDD',
                ' AAAA  BBBBB()            <>   [DDDD',
                ' /_____BBBBB____________________DDDD',
                '  ||   BBBBB                   DDDDD',
                '  ||   BBBBB                    ||',
            ],
            legend: {
                A: {
                    label: 'Brom',
                    offset: [1,7],
                    handler: 'tavern_swordsman',
                    klass: 'tavern_swordsman'
                },
                B: {
                    label: 'Charles',
                    offset: [6,-1],
                    handler: 'tavern_drunk',
                    klass: 'tavern_drunk'
                },
                C: {
                    label: 'Francis',
                    offset: [23,7],
                    handler: 'tavern_merchant',
                    klass: 'tavern_merchant'
                },
                D: {
                    label: 'Thomas',
                    offset: [30,-1],
                    handler: 'tavern_villager',
                    klass: 'tavern_villager'
                }
            }
        }
    },
    tavernTableSmall: {
        image: [
            '       ________',
            '  O  ·`   <> ·T',
            ' |\\·`[]    ·` |',
            ' ·`¯<>   ·`   |',
            'T-------T',
            '|| |\\   |',
            '|       |',
        ],
        fills: [
            '       tttttttt',
            '  O  tt   <> tt',
            ' c\\ttbb    tt t',
            ' tt¯<>   tt   t',
            'ttttttttt',
            'tc c\\   t',
            't       t',
        ],
        colors: {
            c: 'grey',
            t: 'darkbrown',
            b: 'brown'
        },
        advMouseovers: {
            area: [
                '       ________',
                ' AAA ·`   <> ·T',
                ' AAA`[]    ·` |',
                ' AAA<>   ·`   |',
                'TAAA----T',
                '|AAAA   |',
                '|       |',
            ],
            legend: {
                A: {
                    label: 'Edmund',
                    offset: [0,-1],
                    handler: 'tavern_cartographer',
                    klass: 'tavern_cartographer'
                    //requirement: function() {}
                }
            }
        }
    },
    tavernBard: {
        image: [
            '.ƒO  ♫',
            '|/ \\   ♫',
            '|\\O=="#',
            '|\\\\\\  ',
            ' |/|\\,',
            '  `',
        ],
        fills: [
            'cƒO  ♫',
            'c/ \\   ♫',
            'c\\ggg"g',
            'cc\\\\',
            ' c/c\\,',
            '  `',
        ],
        colors: {
            c: 'grey',
            g: 'brown'
        },
        advMouseovers: {
            area: [
                'AAAAAA',
                'AAAAAAAA',
                'AAAAAAA',
                'AAAAAA',
                ' AAAAA',
                '  `'
            ],
            legend: {
                A: {
                    label: 'Arabella',
                    offset: [0,6],
                    handler: 'tavern_bard',
                    klass: 'bard'
                }
            }
        }
    },
    tavernChair: {
        image: [
            '._.',
            '| |',
            '|_|',
            '|\\_\\',
            ' | |',
        ],
        fills: [
            'ccc',
            'ccc',
            'ccc',
            'cccc',
            ' ccc'
        ],
        colors: {
            c: 'grey'
        }
    },
    tavernRug: {
        image: [
            '  ,- ¯  ¯  ¯  ¯ .',
            '((  ( ((( )) ) ) )',
            ' ` - _ __   _  -',
        ],
        fills: [
            '  rrrrrrrrrrrrrrr',
            'rrrrrrrrrrrrrrrrrr',
            ' rrrrrrrrrrrrrrr'
        ],
        colors: {
            r: 'darkred'
        }
    },
    tavernBrewmaster: {
        image: [
            '                _______',
            '               |__U_[]_|',
            '               |__ _ __|',
            '         O_    | _(_) _|',
            '|\\\\     / _\\   |(_)(_) |',
            '||\\`-----------------------',
            '\\||¯¯|¯¯¯|¯¯¯|¯¯¯|¯¯¯|¯¯¯|¯',
            ' \\|__|___|___|___|___|___|_',
        ],
        fills: [
            '                rrrrrrr',
            '               rrrlrpprr',
            '               rrr B rrr',
            '         O_    r BBBB rr',
            'wbb     / _\\   rBBBBBB r',
            'wwbbbbbbbbbbbbbbbbbbbbbbbbb',
            'wwwbbwbbbwbbbwbbbwbbbwbbbwb',
            ' wwwwwwwwwwwwwwwwwwwwwwwwww',
        ],
        colors: {
            b: 'beige',
            w: 'darkbrown',
            B: 'brown',
            r: 'grey',
            l: 'blue',
            p: 'purple'
        },
        advMouseovers: {
            area: [
                '                _______',
                '               |__U_[]_|',
                '               |__ _ __|',
                '        AAAA   | _(_) _|',
                '|\\\\     AAAA   |(_)(_) |',
                '||\\`----AAAA---------------',
                '\\||¯¯|¯¯¯|¯¯¯|¯¯¯|¯¯¯|¯¯¯|¯',
                ' \\|__|___|___|___|___|___|_',
            ],
            legend: {
                A: {
                    label: 'John',
                    offset: [8,5],
                    handler: 'tavern_brewmaster',
                    klass: 'tavern_brewmaster'
                }
            }
        }
    },
    tavernFireplace: {
        image: [
            ' .________________.',
            ' |-_¯ =  = ¯ _ - ¯|',
            ' |-.------------._|',
            ' |=|    ( ,     |-|',
            '/ _|   , / `)   |-=\\',
            '|==|  //, /\\(`\\ |=_|',
        ],
        fills: [
            ' gggggggggggggggggg',
            ' gggggggggggggggggg',
            ' gggggggggggggggggg',
            ' gggooooooooooooggg',
            'ggggoooooooooooogggg',
            'ggggoobboobbobbogggg',
        ],
        colors: {
            g: 'grey',
            o: 'orange',
            b: 'brown'
        },
        mouseover: {
            label: 'Fireplace',
            offset: [6,-1],
            handler: 'tavern_fireplace',
            klass: 'tavern_fireplace'
        }
    },
    tavernDoor: {
        image: [
            ',_______,',
            '|  \' \'  |',
            '|  · ·<<|',
            '|  \' \'  |',
            '|Ö · ·  |',
            '|  \' \'<<|',
            '|  · ·  |',
        ],
        fills: [
            'fffffffff',
            'fiiiiiiif',
            'fiiiiiggf',
            'fiiiiiiif',
            'fgiiiiiif',
            'fiiiiiggf',
            'fiiiiiiif',
        ],
        colors: {
            f: 'darkbrown',
            g: 'grey',
            i: 'brown'
        },
        mouseover: {
            label: 'Tavern Door',
            offset: [-1,-1],
            handler: 'tavern_door',
            klass: 'tavern_door'
        }
    },
    tavernBarrels: {
        image: [
            '    .-.---.',
            '   (   ) ) )',
            '  .-;-;.---.',
            ' (  (   ) ) )',
            '/\\`-``-`/\\---\\',
        ],
        fills: [
            '    gggbbbb',
            '   gbbbgbbbb',
            '  gggggbbbbb',
            ' gbbgbbbgbbbb',
            'ssggggggssssss'
        ],
        colors: {
            b: 'brown',
            g: 'brown',
            s: 'grey'
        }
    },
    tavernLamp: {
        image: [
            ' )',
            '\\_/',
            ' `',
        ],
        fills: [
            ' o',
            'www',
            ' w',
        ],
        colors: {
            o: 'orange',
            w: 'grey'
        }
    },










    moon: {
        image: [
            ' ,-,',
            '/ /',
            '\\ \\',
            ' `-`'
        ]
    },

    sky1: {
        image: [
            '                        .             ,-,                                         .                  .',
            '                                     / /',
            '          .                          \\ \\                                                 .                  .',
            '                                      `-`          .                  .',
            '                                                                                                      .',
            ' .                 .                                                                           .',
            '                                       .                                     .                                       .'
        ]
    },

    abbey: {
        image: [
            '                    ^',
            '                   /|\\',
            '                  / \' \\',
            '                 / = \\ \\',
            '                |   _ | |',
            '                | _   | |___ __',
            '              ·`|_____|·`  ·`  `·',
            '          ___/            /    __\\_______________',
            '        ·` ·`      _    ·`   ·`                 ·`·',
            '       /  /            /    /      _           /   \\',
            '     ·` ·`  -        ·`   ·`            _    ·`  _  `·',
            '    /  /        =   /    /                  /  .` `.  \\',
            '  ·` ·` ______    ·`   ·`     _           ·`   \' _ \'   `·',
            ' /__| ¯        ¯ |    /__________________/               \\',
            ' |  |  /\\    /\\  |    |                  |               |',
            ' |  | /::\\  /::\\ |    |   /\\   /\\   /\\   |      .-.      |',
            ' |  | |::|  |::| |    |  /::\\ /;;\\ /::\\  |    .` | `.    |',
            ' |  | |::|  |::| |    |  |::| |;;| |::|  |   .   |   .   |',
            ' |  | |::|  |::| |    |  |::| |;;| |::|  |   |   |   |   |',
            ' |  | |::|  |::| |    |  |::| |;;| |::|  |   |  .|.  |   |',
            ' |  | |__|  |__| |    |  |__| |__| |__|  |   |   |   |   |',
            ' |  |            |    |                  |   |___|___|   |',
            '/   |            |    /                 /   /=========\\   \\'
        ],
        fills: [
            '                    w',
            '                   www',
            '                  wwwww',
            '                 wwwwwww',
            '                wwwwwwwww',
            '                wwwwwwwwwwwwwww',
            '              wwwwwwwwwwwwwwwwwww',
            '          wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            '        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            '       wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            '     wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            '    wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            '  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        ],
        colors: {

        }
    },
    crypt: {
        image: [
            '   .-------.--------.',
            '  /____ T / ________ \\ T',
            '.`     `|\\_/   __   \\_/|',
            '|  L    |    ·`  `·    |',
            '\\     _ \\  ·` ____ `·  /',
            ' |       ||  | __ |  ||',
            ' |       ||  | || |  ||',
            ' |    ;  ||  |.   |  ||',
            '/  /    /  \\ |    | /  \\',
        ],
        fills: [
            '   wwwwwwwwwwwwwwwwww',
            '  wwwwwwwwwwwwwwwwwwwwww',
            'wwwwwwwwwwwwwwwwwwwwwwww',
            'wwwwwwwwwwwwwwwwwwwwwwww',
            'wwwwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwww',
            ' wwwwwwwwwwwwwwwwwwwwww',
            'wwwwwwwwwwwwwwwwwwwwwwww',
        ],
        colors: {

        },
        mouseover: {
            label: 'The Crypt',
            offset: [11,-1],
            handler: 'abbey.crypt',
            klass: 'crypt',
            bordered: false
        }
    },

    bigTree: {
        image: [
            '         ^',
            '        /^\\',
            '        ,`\\',
            '       /`\\|`',
            '       ,|.|\\',
            '      / / \\/`',
            '     ./,/ \\ `\\',
            '     ,\\|/-`\\.·',
            '    / ,|,^|/\\ \\',
            '    `·./ `|\\ _\\`',
            '   ,/,/|= .·`\\ `',
            '  /`·. | / \\ `\' \\',
            '  /,/ \\/^ `| \\` _',
            ' ._, / |/| \\ ,·` \\',
            ' ,/`·./|, =|/\\ . `',
            '/, `/ \\| ` \\ ` \\ \\`',
            ',/, /  / ^ |` \\. \\ `',
            '       |   |',
            '       |_  |',
            '       |   |',
            '       |   |',
            '      /  ,  \\',
        ],
        fills: [
            '         g',
            '        ggg',
            '        ggg',
            '       gggtg',
            '       gtgtg',
            '      gggtgbg',
            '     bggttg gg',
            '     gbtgtggbb',
            '    g gtggtbg g',
            '    bbbgtgtg bgg',
            '   ggggtttbbbg gg',
            '  gbbb ttbtg gg gg',
            '  ggg btgtgt gg b',
            ' bbg g tgttg bbb g',
            ' ggbbbgtgtttbg g g',
            'gg gg bttgtg g g gg',
            'ggg g  gtgttg gg g g',
            '       ttttt',
            '       ttttt',
            '       ttttt',
            '       ttttt',
            '      ttttttt',
        ],
        colors: {
            g: 'green',
            b: 'brown',
            t: 'brown'
        }
    },

    bigTree2: {
        image: [
            '         ^',
            '        /^\\',
            '        ,`\\',
            '       /`\\|`',
            '       ,|.|\\',
            '      / / \\/`',
            '     ./,/ \\ `\\',
            '     ,\\ /-`\\.·',
            '    / , ,^|/\\ \\',
            '    `·./|`|\\ _\\`',
            '   ,/,/ |=.·`\\ `',
            '  /`·.  |/ \\ `\' \\',
            '  /,/ \\/^ `| \\` _',
            ' ._, /  /| \\ ,·` \\',
            ' ,/`·./ , =|/\\ . `',
            '/, `/ \\ |` \\ ` \\ \\`',
            ',/, /  / ^ |` \\. \\ `',
            '  ,  ,  |  | \\   `',
            '        |_ |',
            '        |  |',
            '        |  |',
            '       / ,  \\',
        ],
        fills: [
            '         g',
            '        ggg',
            '        ggg',
            '       gggtg',
            '       gtgtg',
            '      gggtgbb',
            '     ggggtg gg',
            '     gg ttggbb',
            '    g g ggtbg g',
            '    bbbgtgtg bgg',
            '   gggg ttbbbg g',
            '  gbbb  tgtt gg g',
            '  ggg bggtgt gg b',
            ' bbg g  ggtg bbb g',
            ' ggbbbg gtttbg g g',
            'gg gg b tgtt g g gg',
            'ggg g  gtgttg gg g g',
            '  g  g  tttt g   g',
            '        tttt',
            '        tttt',
            '        tttt',
            '       tttttt',
        ],
        colors: {
            g: 'green',
            b: 'brown',
            t: 'brown'
        }
    },

    father: {
        image: [
            ' _O_',
            ' /  *',
            ' \\ \\|',
            ' | )|',
            '/__||',

        ],
        fills: [
            ' www',
            ' wwww',
            ' wwww',
            ' wwww',
            'wwwww',
        ],
        mouseover: {
            label: 'Father Dermont',
            offset: [-4,-1],
            handler: 'abbey.father',
            klass: 'father',
            bordered: false
        }
    },


    cryptCeiling: {
        image: [
            '_____________________________________________________________________________________________________________________________',
            '     \\                   \\                   \\                |             /                  /                    /',
            '',
            '  \\            `                     \\                    |               ,           /                      /            ,',
        ],
        //fills: [
        //
        //],
        colors: {

        }
    },
    cryptFloor: {
        image: [
            '     /                         ,                        |             |         `              \\                      \\',
            '',
            '               /                    /                         |                      \\                     \\                \\',
            '=============================================================================================================================',
        ],
        //fills: [
        //
        //],
        colors: {

        }
    },
    cryptArch: {
        image: [
            '--------------------\\    /--------------------',
            '                 ¯·  |  |  ·¯',
            '                   `. /\\ .`',
            '                     \\==/',
            '                     |  |',
            '                     |  |',
            '                     |  |',
            '                     |  |',
            '                     |  |',
            '                     |  |',
            '--------------------[    ]--------------------'
        ],
        fills: [
            'gggggggggggggggggggggggggggggggggggggggggggggg',
            '                 gggggggggggg',
            '                   gggggggg',
            '                     gggg',
            '                     gggg',
            '                     gggg',
            '                     gggg',
            '                     gggg',
            '                     gggg',
            '                     gggg',
            'gggggggggggggggggggggggggggggggggggggggggggggg'
        ],
        colors: {
            g: 'grey'
        }
    },
    torch: {
        image: [

        ],
        fills: [

        ],
        colors: {

        }
    },




    village: {
        image: [
            '       /\\__/\\',
            '  /|===||++||===|\\',
            ' /|/=\\ __   /_\\  |\\',
            '/| _- /__\\  |_| _ |\\',
            '| /_\\ |__| /_\\ /_\\ |',
            '| |_|__   _|_|_|_| |',
            '|\\  /_^\\ /_\\ /_\\  /|',
            ' |\\ |_H| |_| |_| /|',
            '  |==============|',
        ],
        fills: [
            '       wwwwww',
            '  wwwwwwwggwwwwwww',
            ' wwhhhhhhhhhhhhhhww',
            'wwhhhhhhhhhhhhhhhhww',
            'whhhhhhhhhhhhhhhhhhw',
            'whhhhhhhhhhhhhhhhhhw',
            'wwhhhhhhhhhhhhhhhhww',
            ' wwhhhhhhhhhhhhhhww',
            '  wwwwwwwwwwwwwwww',
        ],
        colors: {

        },
        mouseover: {
            label: 'Greyfare',
            offset: [6,4],
            handler: 'world.village',
            klass: 'village',
            bordered: true
        }
    },
    woods: {
        image: [
            '                    ...........................',
            '                    ............................',
            '                .................................',
            '              ....................................',
            '           .......................................',
            '..       .........................................',
            '................................',
            '................................',
            '.............................',
            '.............................',
            '.............................',
            '.............................',
            '.............................',
            '.............................',
        ],
        invisible: true,
        mouseover: {
            label: 'The Woods',
            offset: [19,9],
            handler: 'world.woods',
            klass: 'woods',
            bordered: true
        }
    },
    glade: {
        image: [
            '..........................',
            '.............................',
            '.............................',
            '.............................',
            '.............................',
            '.............................................',
            '.............................................',
            '...........................................',
            '............................................',
            '...........................................',
            '...........................................',
            '............................................',
            '............................................',
            '...........................................',
            '..........................................',
            '........................................',
        ],
        invisible: true,
        mouseover: {
            label: 'The Cursed Glade',
            offset: [11,9],
            handler: 'world.glade',
            klass: 'glade',
            bordered: true
        }
    },

    gate: {
        image: [
            '   ___               ___',
            '  /   \\             /   \\',
            ' /     \\           /     \\',
            '/       \\         /       \\',
            '| ╬   ╬ |---------| ╬   ╬ |',
            '[-------] ∩ ∩ ∩ ∩ [-------]',
            ' |     |   .---.   |   - |',
            ' | |   | .\'┼ ┼ ┼\'. |     |',
            ' |   - |/┼ ┼ ┼ ┼ ┼\\|     |',
            ' |     | ┼ ┼ ┼ ┼ ┼ | ]   |',
            ' |  _  | ┼ ┼ ┼ ┼ ┼ |     |',
            ' |     | ┼ ┼ ┼ ┼ ┼ |   _ |',
        ],
        fills: [
            '   bbb               bbb',
            '  bbbbb             bbbbb',
            ' bbbbbbb           bbbbbbb',
            'bbbbbbbbb         bbbbbbbbb',
            'ggwgggwgggggggggggggwgggwgg',
            'ggggggggggggggggggggggggggg',
            ' ggggggggggggggggggggggggg',
            ' gggggggggglllllgggggggggg',
            ' gggggggglllllllllgggggggg',
            ' ggggggglllllllllllggggggg',
            ' ggggggglllllllllllggggggg',
            ' ggggggglllllllllllggggggg',
        ],
        colors: {
            w: 'grey', // or white
            g: 'grey',
            b: 'grey', // or blue
            //l: 'brown'
        },
        mouseover: {
            //label: '  The  \n Woods',
            //offset: [10,3],
            label: 'Village Gate',
            offset: [8,-1],
            handler: 'village.gate',
            klass: 'gate'
        },
        //overlays: [
        //    {
        //        overlay: 'Venture\n  Out  ',
        //        offset: [10,3],
        //        trigger: 'mouseover',
        //        onClick: 'village.gate'
        //    }
        //]
    },
    wall: {
        image: [
            '_|¯|_|¯|_|¯|_|¯|_',
            '|               |',
            '|   ∩   ∩   ∩   |',
            '|               |',
            '|     -         |',
            '|-           =  |'
        ],
        fills: [
            'ggggggggggggggggg',
            'ggggggggggggggggg',
            'ggggggggggggggggg',
            'ggggggggggggggggg',
            'ggggggggggggggggg',
            'ggggggggggggggggg'
        ],
        colors: {
            g: 'grey',
        }
    },
    tavern: {
        image: [
            '        ___',
            '       /___\\',
            '   ____|___|___________',
            '  /  /                 \\',
            ' /  /    /     \\   \\    \\',
            '/__/_____________________\\',
            ' |  | ┌┬┐   __ __   ┌┬┐ |',
            ' |  | └┴┘  |  |  |  └┴┘ |',
            ' |  |      | ·|· |      |'
        ],
        fills: [
            '        xxx',
            '       xxxxx',
            '   xxxxxxxxxxxxxxxxxxxx',
            '  xxxxxxxxxxxxxxxxxxxxxx',
            ' xxxxxxxxxxxxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxxxxxxxxxxxx',
            ' xxxxxxxxxxxxxxxxxxxxxxxx',
            ' xxxxxxxxxxxxxxxxxxxxxxxx',
            ' xxxxxxxxxxxxxxxxxxxxxxxx'
        ],
        colors: {},
        mouseover: {
            label: 'Tavern',
            offset: [11,-1],
            handler: 'village.tavern',
            klass: 'tavern'
        }
    },
    chapel: {
        image: [
            '     ╬_____',
            '    /_\\    \\',
            '   // \\\\    \\',
            '  // _ \\\\    \\',
            ' // /┼\\ \\\\    \\',
            '//  ├┼┤  \\\\____\\',
            '||  ¯¯¯  ||    |',
            '||  ___  ||    |',
            '||  | |  ||    |',
            '||  | |  ||    |',
        ],
        fills: [
            '     xxxxxx',
            '    xxxxxxxx',
            '   xxxxxxxxxx',
            '  xxxxxxxxxxxx',
            ' xxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxx'
        ],
        colors: {},
        mouseover: {
            label: 'Chapel',
            offset: [3,-1],
            handler: 'village.chapel',
            klass: 'chapel'
        }
    },
    blacksmith: {
        image: [
            '     __',
            '    /__\\',
            '   _|= |________',
            '  / |__|    - \\ \\',
            ' /  ______┬____\\_\\',
            '/__/|░░|  |[]  | |',
            '|[]       |[]  | |',
            '|[]  ____',
            '      )(¯',
        ],
        fills: [
            '     gg',
            '    gggg',
            '   rggggrrrrrrrr',
            '  rrggggrrrrrrrrr',
            ' rrrrrrrrrsrrrrrrr',
            'rrrrgoog..sxx..s.s',
            'sxx.......sxx..s.s',
            'sxx..BBBB',
            '      BBB'
        ],
        colors: {
            //g: 'white',
            //r: 'red',
            //s: 'white',
            //B: 'grey',
            //o: 'orange',
            //x: 'white'
        },
        mouseover: {
            label: 'Blacksmith',
            offset: [10,1],
            handler: 'village.blacksmith',
            klass: 'blacksmith'
        }
    },
    alchemyLab: {
        image: [
            '        -o-',
            '    _    I',
            '   /_\\_./ \\',
            '   |  _/  |',
            '   /\\/ / /\\_',
            '  /_/  _/   \\',
            ' // _ /  ___ \\',
            '//   /   |·| |',
            '||=  |   |·| |'
        ],
        fills: [
            '        xxx',
            '    x    x',
            '   xxxxxxxx',
            '   xxxxxxxx',
            '   xxxxxxxxx',
            '  xxxxxxxxxxx',
            ' xxxxxxxxxxxxx',
            'xxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxx',
        ],
        colors: {},
        mouseover: {
            label: 'Alchemy Lab',
            offset: [1,-1],
            handler: 'village.alchemy',
            klass: 'alchemy'
        }
    },
    huntersLodge: {
        image: [
            '    __            /\\',
            '    ||___________/  \\___',
            '   //     //    / /\\ \\  \\',
            '  //     //    / |__| \\  \\',
            ' //     //    /        \\  \\',
            '//T¯¯¯¯//¯¯¯¯¯|.--¯¯--.|¯T\\\\',
            ' ||    ||     |  /¯¯\\  | ||',
            ' ||    ||     |  |  |  | ||'
        ],
        fills: [
            '    xx            xx',
            '    xxxxxxxxxxxxxxxxxxxx',
            '   xxxxxxxxxxxxxxxxxxxxxx',
            '  xxxxxxxxxxxxxxxxxxxxxxxx',
            ' xxxxxxxxxxxxxxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            ' xxxxxxxxxxxxxxxxxxxxxxxxxx',
            ' xxxxxxxxxxxxxxxxxxxxxxxxxx'
        ],
        colors: {},
        mouseover: {
            label: "Hunter's Lodge",
            offset: [8,-1],
            handler: 'village.lodge',
            klass: 'lodge'
        }
    },
    rightHouse1: {
        image: [
            '   ________',
            '  / | \\    \\',
            ' /─┬┴┬─\\  \\ \\',
            '/__|_|__\\____\\',
            ' |     |    |',
            ' | [X] | ┌┐ |',
            ' |     | ││ |'
        ],
        //fills: [
        //    '   yyyyyyyy',
        //    '  ybbbyyyyyy',
        //    ' ybbbbbyyyyyy',
        //    'ybbbbbbbyyyyyy',
        //    ' wwwwwwwwwwww',
        //    ' wwXXXwwwddww',
        //    ' wwwwwwwwddww'
        //],
        //colors: {
        //    y: 'yellow',
        //    b: 'brown',
        //    w: 'darkbrown',
        //    d: 'darkbrown',
        //    X: 'darkbrown'
        //}
    },
    rightHouse2: {
        image: [
            '   ________',
            '  /\\ /\\    \\',
            ' /__V__\\  \\ \\',
            '/___I___\\____\\',
            ' |     |    |',
            ' | [X] | ┌┐ |',
            ' |     | ││ |',
        ]
    },
    rightHouse3: {
        image: [
            '        __',
            '   _____││_',
            '  / | \\ \'\' \\',
            ' /─┬┴┬─\\  \\ \\',
            '/__|_|__\\____\\',
            ' |     |    |',
            ' | ┌─┐ | [] |',
            ' | │·│ |    |'
        ],
        fills: [
            '        yy',
            '   yyyyyyyy',
            '  ybbbyyyyyy',
            ' ybbbbbyyyyyy',
            'ybbbbbbbyyyyyy',
            ' wwwwwwwwwwww',
            ' wwXXXwwwddww',
            ' wwwwwwwwddww'
        ],
        mouseover: {
            label: "Locked House",
            offset: [2,-1],
            handler: 'village.locked2',
            klass: 'locked2'
        }
    },
    swordsmanHouse: {
        image: [
            '        __',
            '   _____││_',
            '  / | \\ \'\' \\',
            ' /─┬┴┬─\\  \\ \\',
            '/__|_|__\\____\\',
            ' |     |    |',
            ' | ┌─┐ | [] |',
            ' | │·│ |    |'
        ],
        fills: [
            '        yy',
            '   yyyyyyyy',
            '  ybbbyyyyyy',
            ' ybbbbbyyyyyy',
            'ybbbbbbbyyyyyy',
            ' wwwwwwwwwwww',
            ' wwXXXwwwddww',
            ' wwwwwwwwddww'
        ],
        mouseover: {
            label: "Swordsman's\n   House",
            offset: [2,-1],
            handler: 'village.swordsman',
            klass: 'swordsman'
        }
    },
    leftHouse1: {
        image: [
            '   ________',
            '  /    / | \\',
            ' / /  /─┬┴┬─\\',
            '/____/__|_|__\\',
            ' |    |     |',
            ' | ┌┐ | [X] |',
            ' | ││ |     |',
        ],
        fills: [
            '   xxxxxxxx',
            '  xxxxxxxxxx',
            ' xxxxxxxxxxxx',
            'xxxxxxxxxxxxxx',
            ' xxxxxxxxxxxx',
            ' xxxxxxxxxxxx',
            ' xxxxxxxxxxxx'
        ],
        mouseover: {
            label: "Villager House",
            offset: [0,-1],
            handler: 'village.villager1',
            klass: 'villager1'
        }
    },
    leftHouse2: {
        image: [
            '   ________',
            '  /    / | \\',
            ' / /  /─┬┴┬─\\',
            '/____/__|_|__\\',
            ' |    |     |',
            ' | ┌┐ | [X] |',
            ' | ││ |     |',
        ],
        fills: [
            '   xxxxxxxx',
            '  xxxxxxxxxx',
            ' xxxxxxxxxxxx',
            'xxxxxxxxxxxxxx',
            ' xxxxxxxxxxxx',
            ' xxxxxxxxxxxx',
            ' xxxxxxxxxxxx'
        ],
        mouseover: {
            label: "Locked House",
            offset: [0,-1],
            handler: 'village.locked1',
            klass: 'locked1'
        }
    },
    road: {
        image: [
            //'              -',
            //'       _   ¯',
            //'         _    ¯',
            '      -      _',
            '',
            '       =   _',
            '                -',
            '',
            '              .     ¯',
            '',
            '                  -     =',
            '                      ,',
            '               =',
            '',
            '                    _',
            '            -=',
            '         .      _',
            '',
            '           ,',
            '     ¯',
            '   .        -',
            '     _',
            '.',
            '          -    =',
            '    =        .',
            '-',
            '         _',
            '',
            '  `          .     _',
            '',
            '        -',
            '      .        =        _',
            '          _          ,      -',
        ],
        fills: [
            //'              b',
            //'       b   b',
            //'         b    b',
            '      b      b',
            '',
            '       b   b',
            '                b',
            '',
            '              b     b',
            '',
            '                  b     b',
            '                      b',
            '               b',
            '',
            '                    b',
            '            bb',
            '         b      b',
            '',
            '           b',
            '     b',
            '   b        b',
            '     b',
            'b',
            '          b    b',
            '    b        b',
            'b',
            '         b',
            '',
            '  b          b     b',
            '',
            '        b',
            '      b        b        b',
            '          b          b      b',
        ],
        colors: {
            g: 'green',
            b: 'brown'
        }
    },


    grass: {
        image: [
            ','
        ],
        fills: [
            'g'
        ],
        colors: {
            g: 'green'
        }
    },
    tree: {
        image: [
            '    ^    ',
            '   /^\\   ',
            '  ,|/\\`  ',
            '  ,/,|`  ',
            ' /,|,``\\ ',
            ', /,^|\'\\`',
            '/ /|`\\ `\\',
            '   | |   ',
            '  / , \\  '
        ],
        fills: [
            '    g    ',
            '   ggg   ',
            '  gbggg  ',
            '  gggbg  ',
            ' ggbgggg ',
            'g gggbggg',
            'g gbgg gg',
            '   b b   ',
            '  b b b  '
        ],
        colors: {
            g: 'green',
            b: 'brown'
        }
    },
    farTree: {
        image: [
            ' ^',
            '/|\\',
            '/|\\'
        ],
        fills: [
            ' g',
            'gbg',
            'gbg'
        ],
        colors: {
            g: 'green',
            b: 'brown'
        }
    },
    farTree2: {
        image: [
            ' ^',
            '/^\\',
            '/|\\'
        ],
        fills: [
            ' g',
            'ggg',
            'gbg'
        ],
        colors: {
            g: 'green',
            b: 'brown'
        }
    },
    farDeadTree: {
        image: [
            ' ^',
            '/^\\',
            '/|\\'
        ],
        fills: [
            ' b',
            'lbl',
            'lbl'
        ],
        colors: {
            b: 'brown',
            l: 'lightbrown'
        }
    },
    farDeadTree2: {
        image: [
            ' ^',
            '~|`',
            '/|\\'
        ],
        fills: [
            ' b',
            'lbl',
            'lbl'
        ],
        colors: {
            b: 'brown',
            l: 'lightbrown'
        }
    },
    farDeadTree3: {
        image: [
            ' ^',
            '/^-',
            ',|`',
        ],
        fills: [
            ' b',
            'lbl',
            'lbl'
        ],
        colors: {
            b: 'brown',
            l: 'lightbrown'
        }
    },
    farDeadTree4: {
        image: [
            ' ,',
            ',^`',
            '/|`',
        ],
        fills: [
            ' b',
            'lbl',
            'lbl'
        ],
        colors: {
            b: 'brown',
            l: 'lightbrown'
        }
    },
    abbeySmall: {
        image: [
            ' __+',
            '////\\',
            '|__||'
        ],
        fills: [
            ' www',
            'wwwww',
            'wwwww'
        ],
        mouseover: {
            label: 'The Abbey',
            offset: [-2,-1],
            handler: 'world.abbey',
            klass: 'abbey'
        }
    },
    graveyard: {
        image: [
            ' ∩ ∩ ',
            '∩ ∩ ∩',
        ],
        fills: [
            'wwwww',
            'wwwww',
        ],
        mouseover: {
            label: 'The Graveyard',
            offset: [-4,2],
            handler: 'world.graveyard',
            klass: 'graveyard'
        }
    },
    cave: {
        image: [
            ' /\\',
            '/##\\'
        ],
        fills: [
            ' gg ',
            'gppg'
        ],
        colors: {
            g: 'grey',
            p: 'purple'
        },
        mouseover: {
            label: 'A Cave',
            offset: [-1,-1],
            handler: 'world.cave',
            klass: 'cave'
        }
    },

    mountain1: {
        image: [
            ' /\\',
            '/  \\'
        ],
        fills: [
            ' bb',
            'bbbb'
        ],
        colors: {
            b: 'grey',
            w: 'white'
        }
    },
    mountain2: {
        image: [
            ' /\\',
            '/**\\'
        ],
        fills: [
            ' bb',
            'bwwb'
        ],
        colors: {
            b: 'grey',
            w: 'white'
        }

    },
    mountain3: {
        image: [
            '  /\\',
            ' /**\\',
            '/    \\'
        ],
        fills: [
            '  bb',
            ' bwwb',
            'bbbbbb'
        ],
        colors: {
            b: 'grey',
            w: 'white'
        }
    },
    mountain4: {
        image: [
            '   /\\',
            '  /**\\',
            ' /    \\',
            '/      \\'
        ],
        fills: [
            '   bb',
            '  bwwb',
            ' bbbbbb',
            'bbbbbbbb'
        ],
        colors: {
            b: 'grey',
            w: 'white'
        }
    },
    mountain5: {
        image: [
            '   /\\',
            '  /**\\',
            ' /****\\',
            '/      \\'
        ],
        fills: [
            '   bb',
            '  bwwb',
            ' bwwwwb',
            'bbbbbbbb'
        ],
        colors: {
            b: 'grey',
            w: 'white'
        }
    },

    river: {
        image: [
            '                         ~',
            '                       ~~',
            '                      ~~',
            '                      ~~',
            '                     ~~',
            '                    ~~~',
            '                  ~~~~',
            '                ~~~~~',
            '              ~~~~~~',
            '            ~~~~~~',
            '          ~~~~~',
            '         ~~~~~',
            '          ~~~~~',
            '        ~~~~~~',
            '       ~~~~~~',
            '     ~~~~~~~',
            '    ~~~~~~~',
            '   ~~~~  ~~~~',
            '  ~~~     ~~~',
            '   ~~~     ~~~',
            '    ~~      ~~~',
            '   ~~~     ~~~',
            '  ~~~     ~~ ~',
            ' ~~      ~   ~~',
            '~~      ~    ~~',
        ],
        fills: [
            '                         ~',
            '                       ~~',
            '                      ~~',
            '                      ~~',
            '                     ~~',
            '                    ~~~',
            '                  ~~~~',
            '                ~~~~~',
            '              ~~~~~~',
            '            ~~~~~~',
            '          ~~~~~',
            '         ~~~~~',
            '          ~~~~~',
            '        ~~~~~~',
            '       ~~~~~~',
            '     ~~~~~~~',
            '    ~~~~~~~',
            '   ~~~~  ~~~~',
            '  ~~~     ~~~',
            '   ~~~     ~~~',
            '    ~~      ~~~',
            '   ~~~     ~~~',
            '  ~~~     ~~ ~',
            ' ~~      ~   ~~',
            '~~      ~    ~~',
        ],
        colors: {
            '~': 'blue'
        }
    },

    blackGate: {
        image: [
            ' |~     |~',
            '/_\\    /_\\',
            '|_|####|_|'
        ],
        fills: [
            ' wf     wf',
            'www    www',
            'wwwggggwww'
        ],
        colors: {
            f: 'red',
            w: 'white',
            g: 'grey'
        }
    },

    deadTree: {
        colors: {
            d: 'darkbrown',
            b: 'brown',
            l: 'lightbrown'
        },
        image: [
            '   _\\   .          ',
            '    ,\\_ |/`        ',
            '       \\,|         ',
            '     v  ||,        ',
            '    ,-\\ |\\         ',
            '       Y/ |  __-__,',
            '      \\|. |,- _--  ',
            '_\\__\\  |    .-`\\_  ',
            '/` ,_\\ /  ,/       ',
            '     \\\\|  =|       ',
            '      \\  \' |       ',
            '       |   |       ',
            '       |=  |       ',
            '       |  \'|       ',
            '      / ,   \\      '
        ],
        fills: [
            '   ll   l          ',
            '    lll lll        ',
            '       blb         ',
            '     l  bbl        ',
            '    llb bb         ',
            '       bbdb  llllll',
            '      lbddbbbblll  ',
            'llbbl  bddddbbbll  ',
            'll bbb bdddb       ',
            '     bbbdddb       ',
            '      bddddb       ',
            '       bdddb       ',
            '       bdddb       ',
            '       bdddb       ',
            '      bdddddb      '
        ]
    },
    deadTree2: {
        colors: {
            d: 'darkbrown',
            b: 'brown',
            l: 'lightbrown'
        },
        image: [
            '    ,` ',
            ' \\ Y   ',
            '  `|\\  ',
            '   \\|  ',
            '_-.||  ',
            '  \\ |,_',
            '  | // ',
            '  | /  ',
            '  |`|  ',
            '  | |  ',
            ' /, `\\ ',
        ],
        fills: [
            '    ll ',
            ' l l   ',
            '  `bb  ',
            '   bb  ',
            'lbbbb  ',
            '  bdbll',
            '  bdbb ',
            '  bdb  ',
            '  bdb  ',
            '  bdb  ',
            ' bdddb ',
        ]
    },



    house: {
        image: [
            '          ^          ',
            '         ( )         ',
            '      / / | \\ \\      ',
            '    / / \\ | / \\ \\    ',
            '  / /    \\|/    \\ \\  ',
            '/ /===============\\ \\',
            ' |  /     |     \\  | ',
            ' | /      |      \\ | ',
            ' |/       |       \\| ',
            ' |-----------------| ',
            ' |       ___       | ',
            ' |      |  /|      | ',
            ' |      | //|      | ',
            ' |      |//.|      | ',
            ' |      |/  |      | '
        ],
        fills: [
            '          t          ',
            '         ooo         ',
            '      bbbwbwbbb      ',
            '    bbbwbwbwbwbbb    ',
            '  bbbwwwwbbbwwwwbbb  ',
            'bbbbbbbbbbbbbbbbbbbbb',
            ' bwwbwwwwwbwwwwwbwwb ',
            ' bwbwwwwwwbwwwwwwbwb ',
            ' bbwwwwwwwbwwwwwwwbb ',
            ' bbbbbbbbbbbbbbbbbbb ',
            ' bwwwwwwwdddwwwwwwwb ',
            ' bwwwwwwdddddwwwwwwb ',
            ' bwwwwwwdddddwwwwwwb ',
            ' bwwwwwwdddxdwwwwwwb ',
            ' bwwwwwwdddddwwwwwwb '
        ],
        colors: {
            b: 'lightbrown',
            d: 'lightbrown',
            o: 'orange',
            t: 'beige',
            x: 'white-beige'
        }
    },

    longHouse: {
        image: [
            '                               (                ',
            '                                  )             ',
            '                                (               ',
            '                              ______            ',
            '                             /______\\           ',
            '                            [________]          ',
            '    _________________________|      |_______    ',
            '   /                 /       |      |   \\   \\   ',
            '  /          /               |      |        \\  ',
            ' /     /                               \\      \\ ',
            '|______________________________________________|',
            '   |    _____        _____        _____     |   ',
            '   |   //\\ /\\\\      /\\/ \\/\\      //\\ /\\\\  = |   ',
            '   |   |\\/ \\/|   =  |/\\ /\\|      |\\/ \\/|    |   ',
            '   |   |/\\ /\\|      |\\/ \\/|      |/\\ /\\|    |   ',
            '   |   ¯¯¯¯¯¯¯      ¯¯¯¯¯¯¯      ¯¯¯¯¯¯¯=   |   ',
            '   |                          =             |   ',
            '   |    =                =                  |   ',
            '   |         =                              |   ',
            '   |              =                 =       |   ',
        ],
        fills: [
            '                               w                ',
            '                                  w             ',
            '                                w               ',
            '                              gggggg            ',
            '                             gggggggg           ',
            '                            gggggggggg          ',
            '    rrrrrrrrrrrrrrrrrrrrrrrrrggggggggrrrrrrr    ',
            '   rrrrrrrrrrrrrrrrrrrrrrrrrrggggggggrrrrrrrr   ',
            '  rrrrrrrrrrrrrrrrrrrrrrrrrrrggggggggrrrrrrrrr  ',
            ' rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr ',
            'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
            '   bbbbbsssssbbbbbbbbsssssbbbbbbbbsssssbbbbbb   ',
            '   bbbbsxxxxxsbbbbbbsxxxxxsbbbbbbsxxxxxsbbbbb   ',
            '   bbbbsxxxxxsbbbbbbsxxxxxsbbbbbbsxxxxxsbbbbb   ',
            '   bbbbsxxxxxsbbbbbbsxxxxxsbbbbbbsxxxxxsbbbbb   ',
            '   bbbbsssssssbbbbbbsssssssbbbbbbsssssssbbbbb   ',
            '   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   ',
            '   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   ',
            '   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   ',
            '   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   ',
        ],
        colors: {
            w: 'white',
            g: 'grey',
            r: 'red',
            b: 'lightbrown',
            s: 'black',
            x: 'darkblue'
        }
    }



};
