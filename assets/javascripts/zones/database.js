
(function ($) {
    'use strict';

    Game.namespace('Zones').Database = {
        woods: {
            name: 'The Woods',
            encounters: ['forest_wolves', 'forest_direWolf', 'forest_spiders', 'forest_goblins'],
            //numEncounters: 4,
            background: 'woods'
        },

        cursedGlade: {
            name: 'The Cursed Glade',
            encounters: ['forest_grizzlies'],
            background: 'darkGrove'
        }

    };

}(jQuery));