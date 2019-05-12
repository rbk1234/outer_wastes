
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
        }
    };

    Game.namespace('Levels').Doodads = {
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