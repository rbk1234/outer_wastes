
(function ($) {
    'use strict';

    Game.namespace('UI').Backgrounds = {

        tavernFirstFloor: {
            doodads: {
                t: 'tavernFirstFloor', l: 'tavernTableLarge', s: 'tavernTableSmall', r: 'tavernRug',
                a: 'tavernBard', c: 'tavernChair',
                b: 'tavernBrewmaster', d: 'tavernDoor', B: 'tavernBarrels', f: 'tavernFireplace', L: 'tavernLamp'
            },
            layout: [
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                            ',
                '                            L                          L            L                      L                              ',
                '                                                                                                                             ',
                '                                  f                                           d                                             ',
                '                                                                                                                               ',
                '     t                                                                                              b                                 ',
                '                                                                                                                           ',
                '                                                                  c                                                        ',
                '                                   r                   a                                                                    ',
                '                                                                                                                                 ',
                '                                                                                                                             ',
                '            s                                                                                                                ',
                '                                                                                                                             ',
                '                                                  l                                                           B                ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',

            ]
        },


        abbey: {
            doodads: {
                S: 'sky1', a: 'abbey', c: 'crypt', t: 'tree', B: 'bigTree', b: 'bigTree2', f: 'father'
            },
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
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                 t                                                                        t                  ',
                '                 t                                                                                                           ',
                '                                                                                                                        t    ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                          B                                                  ',
                '                                        B                                                   b                                ',
                '                                                                                                                             ',
                ' b                                       a                                                                                   ',
                '                                                                                                                             ',
                '                      B                                                                                                      ',
                '                                                                                                           b                 ',
                '          c                                                      f                                                           ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             '
            ],
            requirements: {
                crypt: function() {
                    return Game.Quests.quest('crypt').hasBeenStarted();
                }
            }
        },
        crypt: {
            doodads: {
                c: 'cryptCeiling', f: 'cryptFloor', a: 'cryptArch'
            },
            layout: [
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                'c                                                                                                                            ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '     a                                   a                                   a                                   a           ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                'f                                                                                                                            ',

            ],
            requirements: {
                crypt: function() {
                    return Game.Quests.quest('crypt').hasBeenStarted();
                }
            }
        },

        world_old: {
            doodads: {
                V: 'village',
                t: 'farTree', T: 'farTree2', w: 'woods', c: 'abbey',
                g: 'glade', d: 'farDeadTree', D: 'farDeadTree2', f: 'farDeadTree3', F: 'farDeadTree4',
                n: 'mountain1', m: 'mountain2', N: 'mountain3', M: 'mountain4', W: 'mountain5',
                R: 'river', G: 'blackGate'
            },
            layout: [
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '        N                                                                                                                    ',
                '                 W             M     N                                                                                       ',
                '     N     M        m    N         m    W      M                                                                             ',
                '         N             N    M              n        W     M                                                                  ',
                '    n        d                                                  N                                                            ',
                '                     d     d         F           M                                                                           ',
                '           f     D                          f           W                                                                    ',
                '                       f         d                                W                                                          ',
                '        d     D                           d          N        M                                                              ',
                '                          d       F                                                                                          ',
                '     D      f      d          D                D           M      M     N                                                    ',
                '                       F                D                     n               M                                              ',
                '       d          D        f     d            f        d           W                                                         ',
                '      g     D         d                  f        D                     N     n                M            W                ',
                '               d                    d                      d                                      M              N           ',
                '          T        t        d                 f         d                 M       G         N   m       M                    ',
                '                                T                   F                         n                                     W        ',
                '      t        t      T                  T            d                                    n        M          n        M    ',
                '            T     t         t         t        t                                                                             ',
                '              T        t          t         t                                                                           n    ',
                '       t            T      T    T       T         T                                                                M         ',
                '                             t       t                                                                                       ',
                '             T           t                c     t                                                                            ',
                '     t           t                  T                                                                                        ',
                '      w  T                     T        t                                                                                    ',
                '                                              T                                                                              ',
                '                                  t                                                                                          ',
                '     T    t                                                                                                                  ',
                '                                      t                                                                                      ',
                '    t                              t                                                                                         ',
                '                                                                                                                             ',
                '         t                                                                                                                   ',
                '   t         V                       t                                                                                       ',
                '      T                      t                                                                                               ',
                '                 T     t                                                                                                     ',
                '             t             t     T    T   R                                                                                  '
            ]
        },

        world: {
            doodads: {
                V: 'village',
                t: 'farTree', T: 'farTree2', w: 'woods', a: 'abbeySmall', C: 'cave',
                g: 'glade', d: 'farDeadTree', D: 'farDeadTree2', f: 'farDeadTree3', F: 'farDeadTree4',
                n: 'mountain1', m: 'mountain2', N: 'mountain3', M: 'mountain4', W: 'mountain5',
                R: 'river', b: 'blackGate'
            },
            requirements: {
                village: function() {
                    return Game.Quests.quest('journeyToTown').hasBeenFulfilled();
                },
                cave: function() {
                    return Game.Quests.quest('journeyToTown').hasBeenFulfilled();
                },
                glade: function() {
                    return Game.Quests.quest('journeyToTown').hasBeenFulfilled();
                }
            },
            layout: [
                '                                                                                                                            X',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '        N                                                                                                                    ',
                '                 W             M     N                                                                                       ',
                '     N     M        m    N         m    W      M                                                                             ',
                '         N             N    M            C          W     M                                                                  ',
                '    n             T             t                               N                                                            ',
                '      T      t       t     t         T        t  M                                                                           ',
                '         t                               t              W                                                                    ',
                '    t                  T         t    T      T   t                W                                                          ',
                '               T             t            t          N        M                                                              ',
                '   T     a          t     t       T                   t                                                                      ',
                '     t                        t                T           M      M     N                                                    ',
                '              t        T                t            t        n               M                                              ',
                '                  t        T     t                T      t         W                                                         ',
                '       T    t         t                                                 N     n                M            W                ',
                '               t                   t                   t                                          M              N           ',
                '          T        t        t                               T             M       b         N   m       M                    ',
                '                                T                                             n                                     W        ',
                '      t        t      T                                  t                                 n        M          n        M    ',
                '      w     T     d         t                                                                                                ',
                '              d        t                                                                                                n    ',
                '       f            D      t    T   V                                                                              M         ',
                '                             t                                                                                               ',
                '             f           d                                                                                                   ',
                '     d           D                  t      t    T                                                                            ',
                '         d           d         T        t                                                                                    ',
                '                f       D                     T                                                                              ',
                '                              d   D                                                                                          ',
                '     d    f        d                     F                                                                                   ',
                '                           F          d                                                                                      ',
                '    D           D                  f                                                                                         ',
                '                         d     D                                                                                             ',
                '         f          D                   d                                                                                    ',
                '   D                    f            d                                                                                       ',
                '      d       d              F                                                                                               ',
                '                 F     d                                                                                                     ',
                'g            D             f     D    f   R                                                                                  '
            ]
        },

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
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '                                                                                                                                     ',
                '          t                t                                                                                                         ',
                '                                   d                                                                    t                            ',
                '             d                                           d                             d                                        d    ',
                'd                                              d                          d                                     d                    ',



                '                                                             g                                                              g',
                '       g                           g                                                                       g                 ',
                '                                                                                           g                                 ',
                '                                                             g                                                            g  ',
                '    g       gg                                                                            g                                  ',
                '                                        g                                                           g                        ',
                '                   g                               g               g    g              g                                     ',
            ]
        },


        woods: {
            doodads: { S: 'sky1', t: 'bigTree', T: 'bigTree2', g: 'grass' },
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
                '                                                                                                                             ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '            T                                                                                                                ',
                '                                                                  t                                         t                 ',
                '                    t                                    t                             t                                     ',
                't                                         t                               t                                     t            ',

                '                                 T                           g                                                              g',
                '       g                           g                                                                       g                 ',
                '                                                                                           g                                 ',
                '                         g                               g                        gg              g                          ',
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
                L: 'huntersLodge', h: 'rightHouse1', j: 'rightHouse2', k: 'rightHouse3', s: 'swordsmanHouse', l: 'leftHouse1', v: 'leftHouse2', r: 'road',
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
                '                                                                                  s                              T           ',
                '                                                                                                                             ',
                '                                                                                                                             ',
                '  T                                                                                                                          ',
                '                               t                                                                                        T    ',
                '                                                                                                                             ',
                '           v                                                                                    j                            ',
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



}(jQuery));