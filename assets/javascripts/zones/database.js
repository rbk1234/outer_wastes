
(function ($) {
    'use strict';

    Game.namespace('Zones').Database = {

        road: {
            name: "Traveler's Road",
            background: 'road',
            introSentence: 'The road is made of dirt and rocks.',
            groups: [
                {
                    amount: 1,
                    encounters: ['road_vines']
                },
                {
                    amount: 1,
                    encounters: ['road_chickens']
                },
                {
                    amount: 1,
                    encounters: ['road_sign']
                }
            ],
            onFinish: function() {
                Game.PopupUI.showEndOfZone(
                    'You have cleared ' + this.name + '.',
                    '',
                    'Enter the inn',
                    function() {
                        Game.TownUI.loadTavern();
                    }
                )
            }
        },

        crypt: {
            name: 'The Crypt',
            groups: [
                {
                    amount: 1,
                    encounters: ['cobwebs']
                },
                {
                    amount: 1,
                    encounters: ['spider']
                },
                {
                    amount: 1,
                    encounters: ['bookshelf']
                },
                {
                    amount: 1,
                    encounters: ['rat']
                },
                {
                    amount: 1,
                    encounters: ['desk']
                }
            ],
            background: 'crypt',
            onFinish: function() {
            },
            returnHome: true
        },

        woods: {
            name: 'The Woods',
            groups: [
                //{
                //    amount: 3,
                //    encounters: ['cubs']
                //},
                //
                {
                    amount: 3,
                    encounters: ['mushrooms', 'boar', 'wolf', 'cubs']
                },
                //{
                //    amount: 3,
                //    encounters: ['mushrooms', 'copper', 'forestGoblins', 'wolves', 'boars']
                //},
                {
                    amount: 1,
                    encounters: ['direWolf']
                }
            ],
            //uniqueEncounters: [
            //    {
            //        index: 3,
            //        encounter: 'whiteTree'
            //    }
            //],
            chests: {
                type: 'woodenChest',
                dropRate: 0.05
            },
            //encounters: ['forest_wolves', 'forest_direWolf', 'forest_spiders', 'forest_goblins'],
            //numEncounters: 4,
            background: 'woods',
            onFinish: function() {
                if (Game.Quests.quest('journeyToTown').canFulfill()) {
                    Game.Quests.quest('journeyToTown').fulfill();
                }
            }
        },

        cursedGlade: {
            name: 'The Cursed Glade',
            groups: [
                {
                    amount: 1,
                    encounters: ['forest_grizzlies']
                }
            ],
            background: 'darkGrove'
        }

    };

}(jQuery));