
(function ($) {
    'use strict';

    Game.namespace('Effects').Animations = {
        webWrap: {
            color: 'white',
            frames: [
                [
                    '   _',
                    ' _/ \\_',
                    '/ \\ \\_\\',
                    '|  \\_ \\',
                    '\\\\   \\\\',
                    '\\ \\_  \\',
                    '|   \\_\\',
                ]
            ]
        },
        iceTrap: {
            color: '#00f0fb',
            frames: [
                [
                    '   _',
                    ' _/ \\_',
                    '/`    \\',
                    '\\   \\ |',
                    '|   | /',
                    '/     |',
                    '| /   \\'
                ]
            ]
        },
        explosiveTrap: {
            color: 'orange',
            frameLengths: [0.5,0.5,0.5],
            frames: [
                [
                    ' * .',
                    '     *',
                    ' `',
                    '   * `',
                    ' .    *',
                    '*  *   *'
                ],
                [
                    ' . `',
                    '     .',
                    '     *',
                    '   .',
                    ' `    .',
                    '.  .   .',
                    ' *   *'
                ],
                [
                    ' . ` `',
                    '     .',
                    '   `',
                    '      `',
                    '`  `   `',
                    ' .   .',
                    '*  *   *'
                ]
            ]
        }


    };

}(jQuery));