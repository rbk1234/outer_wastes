
(function ($) {
    'use strict';

    Game.namespace('UI').Backgrounds = {
        darkGrove: {
            doodads: { S: 'sky1', d: 'deadTree', t: 'deadTree2', g: 'grass' },
            layout: [
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                'S                                                                                                                            ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                     t             d                                                                    t                            ',
                '                                                         d                             d                                        d    ',
                'd                                              d                          d                                     d                    ',



                '                                                             g                                                               g       ',
                '       g                           g                                                                       g                         ',
                '                                                                                           g                                         ',
                '                         g                               g                        gg              g                                  ',
                '                   g                                                                                                    g            '
            ]
        },


        woods: {
            doodads: { S: 'sky1', t: 'tree', g: 'grass' },
            layout: [
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                'S                                                                                                                            ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                t                                                                                                      t     ',
                '        t                             t                           t                                t                         ',
                '                    t                                    t                      t      t                                     ',
                't                            t            t                               t                                     t            ',

                '                                                             g                                                              g',
                '       g                           g                                                                       g                 ',
                '                                                                                           g                                 ',
                '                         g                               g                        gg              g                          ',
                '                                                             g                                                            g  ',
                '                                                             g                                                            g  ',
                '    g       gg                                                                            g                                  ',
                '                                        g                                                           g                        ',
                '                   g                               g               g    g              g                                     ',
            ]
        },

        village: {
            doodads: { S: 'sky1', h: 'house', l: 'longHouse', g: 'grass', t: 'tree' },
            layout: [
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                'S                                                                                                                            ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '          t                                     t                                                                                    ',
                '   t                                    t                                                       t                                    ',
                '                                                                                                                                     ',
                '                      h                                l                                                     h                       ',

                '                                                             g                                                               t       ',
                '       g                           g                                                                       g                         ',
                '                                                                                           g                                         ',
                '                         g                               g                        gg              g                                  ',
                '                   g                                                                                                    g            '
            ]
        },

        town: {
            doodads: { S: 'sky1', g: 'gate',w: 'wall', t: 'tavern', c: 'chapel', b: 'blacksmith', a: 'alchemyLab',
                L: 'huntersLodge', h: 'rightHouse1', j: 'rightHouse2', k: 'rightHouse3', l: 'leftHouse1', r: 'road',
                T: 'tree', f: 'farTree', F: 'farTree2'  },
            layout: [
                //'     X                                                                                                                      X',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',

                'S                                                                                                                            ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '             T                              T       T            T                                 T             T           ',
                '    T              T                   T                   T                 T       T                   T             T     ',
                '         T                     T                 T                                       T                                   ',

                //'S         F     f       F        F     f      f     f     f      f        F    f       f    F   F         f   F    F     f   ',
                //'       f                   f         f      F    f           f        f     F        F   f        f    F         F  f        ',
                //'    f     F       f   f       F f       F      f       F   f                      f           f      f     F           F   f ',
                //'              f          f                   F      f          F                f     f            f          f    f         ',
                //'       f           F           f                               F f                        F                                  ',
                //'                                                                                                                             ',
                //'                                                                                                                             ',

                '                                                                                                                             ',
                'w                w                w               g                         w                w                w              ',
                '                                                                                                                             ',
                '                                        l                                                                                    ',
                '                                                                                                                             ',
                '              b                                                                                                              ',
                '                                                                                                                             ',
                '                                                                                                    c                        ',
                '                                                                                                                             ',
                '                                                                                  k                              T           ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '  T                                                                                                                          ',
                '                               t                                                                                        T    ',
                '                                                                                                                             ',
                '           l                                                                                    j                            ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                     T                                                                                                       ',
                '                                                                     h                                                       ',
                '                                                                                                             T               ',
                '     T                                                                                                                       ',
                '                                                                                                                             ',
                '                                T                                                        a                                   ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '              L                                                                                                              ',
                '                                                                                                                             ',
                '                                                                                                              k              ',
                '                                                                                                                             ',
                '                                                     r                                                T                      ',
                '        T                                                                                                                    ',
                '                                                                                                                             ',
                '                                             T                                                                               ',

                //' w                w                w                w                w                w                w                w     ',
                //'                                                                                                                             ',
                //'                                                                               T                                             ',
                //'                 T                                                                                                           ',
                //'                                                 T                                                                  T        ',

                '                                                                                                                             ',
                '                                                                                                                             ',
                ' w                w                w                w                w                w                w                w     ',
                '                                                                                                                             ',
                '    T                           T                                              T                                             ',
                '                 T                       T                          T                                  T                     ',
                '                            T                    T                                        T                         T        ',
            ]
        }
    };

    Game.namespace('UI').Doodads = {
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
                '                        .        ,-,                                            .                  .',
                '                                / /',
                '          .                     \\ \\                                                     .                  .',
                '                                 `-`            .                  .',
                '                                                                                                      .',
                ' .                 .                                                                           .',
                '                                       .                                     .                                       .'
            ]
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
                label: 'The Gates',
                offset: [9,-1],
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
            ]
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
            colors: {}
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


    Game.namespace('UI').Centerpieces = {
        battle: {
            image: [
                ' _                 _',
                ' \\`.             .\'/',
                '  `.`.         .\'.\'',
                '    `.`.     .\'.\'',
                '      `.`. .\'.\'',
                '        `.`.\'',
                '  |\\   .\'.`.`.   /|',
                '  `.`-\'.\'   `.`-\'.\'',
                '   .\\;\'\\_   _/`:/.',
                '_.\\;\' \'-\'   `-\' `:/._',
                '\\;\'               `:/'
            ]
        },
        one: {
            image: [
                '                     ',
                '                     ',
                '        ,;;;.        ',
                '       // |||        ',
                '          |||        ',
                '          |||        ',
                '          |||        ',
                '          |||        ',
                '       ,,;/.\\__,     ',
                '       `````````     ',
                '                     '
            ]
        },
        two: {
            image: [
                '                     ',
                '                     ',
                '        ,;;;,        ',
                '       //   \\\\       ',
                '       ``    ))      ',
                '            //       ',
                '           //        ',
                '          //         ',
                '       ,,;/.___,     ',
                '       `````````     ',
                '                     '
            ]
        },
        three: {
            image: [
                '                     ',
                '                     ',
                '        ,;;;,        ',
                '       //   \\\\       ',
                '       ``    ))      ',
                '        ,,;;//       ',
                '         ```\\\\       ',
                '       ,,    ))      ',
                '       \\\\   //       ',
                '        `\'\'\'\'        ',
                '                     '
            ]
        }
    };


}(jQuery));