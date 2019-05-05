
(function ($) {
    'use strict';

    Game.namespace('Units').Database = {
        player: {
            name: 'Healer (You)',
            stats: {
                maxHealth: 100,
                maxMana: 400,
                manaRegen: 7,
                attackSpeed: 0.3,
                attackDamage: 5
            }
        },
        swashbuckler: {
            name: 'Swashbuckler',
            stats: {
                maxHealth: 150,
                attackSpeed: 1.25,
                attackDamage: 15
            }
        },
        native: {
            name: 'Native',
            stats: {
                maxHealth: 250,
                attackSpeed: 0.5,
                attackDamage: 20,
                reward: 50
            }
        },


        oozeling: {
            name: 'Oozeling',
            stats: {
                maxHealth: 500,
                attackSpeed: 0.6,
                attackDamage: 20,
                reward: 50
            }
        },
        wolf: {
            name: 'Wolf',
            stats: {
                maxHealth: 300,
                attackSpeed: 0.8,
                attackDamage: 10,
                reward: 10
            }
        },
        direWolf: {
            name: 'Dire Wolf',
            stats: {
                maxHealth: 1000,
                attackSpeed: 1.0,
                attackDamage: 45,
                reward: 20
            }
        },
        spider: {
            name: 'Spider',
            stats: {
                maxHealth: 200,
                attackSpeed: 1.2,
                attackDamage: 11,
                reward: 20
            },
            abilityKeys: ['webWrap']
        },
        forestGoblin: {
            name: 'Forest Goblin',
            stats: {
                maxHealth: 600,
                attackSpeed: 0.8,
                attackDamage: 30,
                reward: 20
            },
            abilityKeys: ['iceTrap', 'explosiveTrap']
        }


    };

}(jQuery));