
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
            '                        .             ,-,                                         .                  .',
            '                                     / /',
            '          .                          \\ \\                                                 .                  .',
            '                                      `-`          .                  .',
            '                                                                                                      .',
            ' .                 .                                                                           .',
            '                                       .                                     .                                       .'
        ]
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
            label: '  The\nVillage',
            offset: [6,4],
            handler: 'world.village',
            klass: 'village',
            bordered: true
        }
    },
    woods: {
        image: [
            '...................................',
            '...................................',
            '...................................',
            '...................................',
            '...................................',
            '...................................',
            '...................................',
            '...................................',
            '...................................',
            '...................................',
            '...................................',
        ],
        invisible: true,
        mouseover: {
            label: 'The Woods',
            offset: [14,4],
            handler: 'world.woods',
            klass: 'woods',
            bordered: true
        }
    },
    glade: {
        image: [
            '..............................................',
            '..............................................',
            '..............................................',
            '..............................................',
            '................................................',
            '.................................................',
            '...................................................',
            '...................................................',
            '...................................................',
        ],
        invisible: true,
        mouseover: {
            label: 'The Cursed Glade',
            offset: [14,4],
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
    cathedral: {
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
            label: 'The Chapel',
            offset: [-2,-1],
            handler: 'world.chapel',
            klass: 'chapel'
        }
    },
    cave: {
        image: [

        ]
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
