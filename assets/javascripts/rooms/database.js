
(function ($) {
    'use strict';

    Game.namespace('Rooms').Database = {
        forest_enemy_1: {
            description: 'A dire wolf is stalking the area.',
            enemies: ['direWolf']
        },
        forest_enemy_2: {
            description: 'A pack of wolves is inhabiting the area.',
            enemies: ['wolf', 'wolf', 'wolf', 'wolf']
        },
        forest_enemy_3: {
            description: 'Spiders swarm around your party.',
            enemies: ['spider', 'spider', 'spider', 'spider', 'spider']
        },
        forest_enemy_4: {
            description: 'A forest goblin ambush!',
            enemies: ['forestGoblin', 'forestGoblin']
        }

    };

}(jQuery));