
(function ($) {
    'use strict';

    Game.namespace('Levels').Backgrounds = {
        darkGrove: {
            doodads: { d: 'deadTree', t: 'deadTree2', g: 'grass' },
            layout: [
                '          .                      ,-,                                                    .                  .                         ',
                '                                ( (             .                  .                                                               . ',
                '                                 `-`                                                                  .                              ',
                ' .                 .                                                                           .                                     ',
                '                                       .                                     .                                       .               ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
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
            doodads: { t: 'tree', g: 'grass' },
            layout: [
                '          .                      ,-,                                                    .                  .                         ',
                '                                ( (             .                  .                                                               . ',
                '                                 `-`                                                                  .                              ',
                ' .                 .                                                                           .                                     ',
                '                                       .                                     .                                       .               ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '               t                                                                                                       t             ',
                '        t                             t                           t                                t                                 ',
                '                    t                                    t                      t      t                                        t    ',
                't                            t            t                               t                                     t                    ',

                '                                                             g                                                               g       ',
                '       g                           g                                                                       g                         ',
                '                                                                                           g                                         ',
                '                         g                               g                        gg              g                                  ',
                '                   g                                                                                                    g            '
            ]
        },

        village: {
            doodads: { h: 'house', l: 'longHouse', g: 'grass', t: 'tree' },
            layout: [
                '          .                      ,-,                                                    .                  .                         ',
                '                                ( (             .                  .                                                               . ',
                '                                 `-`                                                                  .                              ',
                ' .                 .                                                                           .                                     ',
                '                                       .                                     .                                       .               ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
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
            doodads: { m: 'moon', g: 'gate',w: 'wall', t: 'tavern', c: 'chapel', b: 'blacksmith', a: 'alchemyLab',
                L: 'huntersLodge', h: 'rightHouse1', j: 'rightHouse2', k: 'rightHouse3', l: 'leftHouse1', r: 'road', T: 'tree'  },
            layout: [
                //'     X                                                                                                                      X',
                '                                                                                                                             ',
                '                        .                                                       .                  .                         ',
                '                                                                                                                             ',
                '          .                                                                             .                  .                 ',
                '                                                .                  .                                                         ',
                '                                m                                                                     .                      ',
                ' .                 .                                                                           .                             ',
                '                                       .                                     .                                       .       ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                'w                w                w               g                         w                w                w              ',
                '                                                                                                                             ',
                '                                        T                                                                                    ',
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
                '                                                                                                                            ',
                '                     T                                                                                                       ',
                '                                                                     h                                                       ',
                '                                                                                                             T               ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                  T                                                      a                                  ',
                '                                                                                                                           ',
                '                                                                                                                            ',
                '              L                                                                                                             ',
                '                                                                                                                            ',
                '                                                                                                              k             ',
                '                                                                                                                             ',
                '                                            T        r                                                T                      ',
                '         T                                                                                                                 ',
                '                                                                                                                             ',
                //' w                w                w                w                w                w                w                w     ',
                //'                                                                                                                             ',
            ]
        }
    };

    Game.namespace('Levels').Doodads = {
        moon: {
            image: [
                ' ,-,',
                '/ /',
                '\\ \\',
                ' `-`'
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
                ' | |   | .\'     \'. |     |',
                ' |   - |/         \\|     |',
                ' |     |           | ]   |',
                ' |  _  |           |     |',
                ' |     |           |   _ |'
            ],
            fills: [
                '   bbb               bbb',
                '  b   b             b   b',
                ' b     b           b     b',
                'b       b         b       b',
                'g w   w ggggggggggg w   w g',
                'ggggggggg g g g g ggggggggg',
                ' ggggggg   ggggg   ggggggg',
                ' ggggggg gg     gg ggggggg',
                ' gggggggg         gggggggg',
                ' ggggggg           ggggggg',
                ' ggggggg           ggggggg',
                ' ggggggg           ggggggg'
            ],
            colors: {
                w: 'grey', // or white
                g: 'grey',
                b: 'grey' // or blue
            }
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
                '   ____|___|__________',
                '  /  /                \\',
                ' /  /    /     \\   \\   \\',
                '/__/____________________\\',
                ' |  | ┌┬┐   __ __   ┌┬┐ |',
                ' |  | └┴┘  |  |  |  └┴┘ |',
                ' |  |      | ·|· |      |'
            ]
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
            ]
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
                'rrrrgoog  sxx  s s',
                'sxx       sxx  s s',
                'sxx  BBBB',
                '      BBB'
            ],
            colors: {
                //g: 'white',
                //r: 'red',
                //s: 'white',
                //B: 'grey',
                //o: 'orange',
                //x: 'white'
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
            ]
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
            ]
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
            ]
        },
        road: {
            image: [
                '              -',
                '       _   ¯',
                '         _    ¯',
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
                '              b',
                '       b   b',
                '         b    b',
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


    Game.namespace('Levels').Centerpieces = {
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