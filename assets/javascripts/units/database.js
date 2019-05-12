
(function ($) {
    'use strict';

    Game.namespace('Units').Database = {
        player: {
            name: 'Healer (You)',
            stats: {
                maxHealth: 120,
                maxMana: 400,
                manaRegen: 7,
                attackSpeed: 0.3,
                attackDamage: 5
            }
        },
        swashbuckler: {
            name: 'Swashbuckler',
            stats: {
                maxHealth: 180,
                attackSpeed: 1.25,
                attackDamage: 85
            }
        },
        native: {
            name: 'Native',
            stats: {
                maxHealth: 300,
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
                maxHealth: 350,
                attackSpeed: 0.8,
                attackDamage: 17,
                reward: 10
            }
        },
        direWolf: {
            name: 'Dire Wolf',
            stats: {
                maxHealth: 1100,
                attackSpeed: 1.0,
                attackDamage: 52,
                reward: 20
            }
        },
        spider: {
            name: 'Spider',
            stats: {
                maxHealth: 250,
                attackSpeed: 1.2,
                attackDamage: 14,
                reward: 20
            },
            abilityKeys: ['webWrap']
        },
        forestGoblin: {
            name: 'Forest Goblin',
            stats: {
                maxHealth: 700,
                attackSpeed: 0.8,
                attackDamage: 30,
                reward: 20
            },
            abilityKeys: ['iceTrap', 'explosiveTrap']
        }


    };

}(jQuery));