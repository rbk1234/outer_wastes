
(function ($) {
    'use strict';

    Game.namespace('Units').Database = {
        cleric: {
            name: 'Cleric',
            stats: {
                maxHealth: 120,
                manaRegen: 7,
                attackSpeed: 0.7,
                attackDamage: 5
            }
        },
        swashbuckler: {
            name: 'Swashbuckler',
            stats: {
                maxHealth: 180,
                manaRegen: 10,
                attackSpeed: 0.7,
                attackDamage: 15
            }
        },
        smuggler: {
            name: 'Smuggler',
            stats: {
                maxHealth: 150,
                manaRegen: 10,
                attackSpeed: 0.7,
                attackDamage: 15
            }
        },
        native: {
            name: 'Native',
            stats: {
                maxHealth: 300,
                attackSpeed: 0.5,
                attackDamage: 20
            }
        },
        brewmaster: {
            name: 'Brewmaster',
            stats: {
                maxHealth: 350,
                attackSpeed: 0.5,
                attackDamage: 25
            }
        },
        crusader: {
            name: 'Crusader',
            stats: {
                maxHealth: 350,
                attackSpeed: 0.5,
                attackDamage: 30
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
                attackDamage: 12,
                reward: 10
            }
        },
        direWolf: {
            name: 'Dire Wolf',
            stats: {
                maxHealth: 1100,
                attackSpeed: 1.0,
                attackDamage: 25,
                reward: 20
            }
        },
        spider: {
            name: 'Spider',
            stats: {
                maxHealth: 250,
                manaRegen: 10,
                attackSpeed: 1.2,
                attackDamage: 3,
                reward: 20
            },
            abilityKeys: ['webWrap']
        },
        forestGoblin: {
            name: 'Forest Goblin',
            stats: {
                maxHealth: 700,
                attackSpeed: 0.8,
                attackDamage: 15,
                reward: 20
            },
            abilityKeys: ['iceTrap', 'explosiveTrap']
        },
        bear: {
            name: 'Grizzly Bear',
            stats: {
                maxHealth: 900,
                attackSpeed: 1.0,
                attackDamage: 20,
                reward: 20
            }
        },
        bearCub: {
            name: 'Grizzly Cub',
            stats: {
                maxHealth: 200,
                attackSpeed: 1.25,
                attackDamage: 5,
                reward: 5
            }
        }



    };

}(jQuery));