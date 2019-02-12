
(function ($) {
    'use strict';

    Game.namespace('Levels').Database = {
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
                {x: 31, y: 3},
                {x: 28, y: 1.5},
                {x: 24, y: 0},
                {x: 0}
            ],
            enemies: [
                {id: 2, x: 40, y: 1},
                {id: 2, x: 45}
            ],
            height: 20 // todo give each unit its own y
        }

    };

}(jQuery));