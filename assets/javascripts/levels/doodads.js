
(function ($) {
    'use strict';

    Game.namespace('Levels').Backgrounds = {
        forest: {
            height: 2,
            layout: [
                '',
                '',
                '',
                '',
                '',
                //'------------------------------------------------------------------------------------',
                '',
                '                                                                                ',
                '               t                                                                 ',
                '        t                             t                           t                                t',
                '                    t                                    t                      t      t',
                't                            t            t                               t     '
            ]
        }
    };

    Game.namespace('Levels').Doodads = {
        t: {
            name: 'tree',
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
            colors: [
                '    g    ',
                '   ggg   ',
                '  gbggg  ',
                '  gggbg  ',
                ' ggbgggg ',
                'g gggbggg',
                'g gbgg gg',
                '   b b   ',
                '  b b b  '
            ]
        }

    };

}(jQuery));