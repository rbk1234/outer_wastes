
(function ($) {
    'use strict';

    Game.namespace('Database').Levels = {
        1: {
            name: 'wasteland',
            background: [
                '                                                                         (80x25)',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                '                                                                                ',
                'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            ],
            allies: [
                {x: 30},
                {x: 20},
                {x: 10},
                {x: 0}
            ],
            enemies: [
                {id: 2, x: 40},
                {id: 2, x: 55}
            ],
            height: 20 // todo give each unit its own y
        }

    };

}(jQuery));