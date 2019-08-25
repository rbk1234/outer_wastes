
(function ($) {
    'use strict';

    Game.namespace('Units').Database = {
        cleric: {
            name: 'Cleric',
            stats: {
                maxHealth: 120,
                manaRegen: 10,
                attackSpeed: 0.6,
                attackDamage: 10
            }
        },
        swashbuckler: {
            name: 'Swashbuckler',
            stats: {
                maxHealth: 180,
                manaRegen: 5,
                attackSpeed: 0.5,
                attackDamage: 20
            }
        },
        smuggler: {
            name: 'Smuggler',
            stats: {
                maxHealth: 150,
                manaRegen: 10,
                attackSpeed: 0.5,
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
                manaRegen: 5,
                attackSpeed: 0.3,
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


        cobweb: {
            name: 'Cobweb',
            stats: {
                maxHealth: 40
            }
        },
        spider: {
            name: 'Spider',
            stats: {
                maxHealth: 50,
                attackSpeed: 0.7,
                attackDamage: 4
            }
        },
        bookshelf: {
            name: 'Dusty Bookshelf',
            stats: {
                maxHealth: 10,
                questObject: true
            }
        },
        rat: {
            name: 'Giant Rat',
            stats: {
                maxHealth: 75,
                attackSpeed: 0.8,
                attackDamage: 7
            }
        },

        boar: {
            name: 'Boar',
            stats: {
                maxHealth: 100,
                attackSpeed: 0.5,
                attackDamage: 10
            }
        },
        mushroom: {
            name: 'Mushroom',
            stats: {
                maxHealth: 50
            }
        },
        wolf: {
            name: 'Wolf',
            stats: {
                maxHealth: 110,
                attackSpeed: 0.8,
                attackDamage: 8
            }
        },
        cub: {
            name: 'Bear Cub',
            stats: {
                maxHealth: 50,
                attackSpeed: 0.6,
                attackDamage: 5
            }
        },

        copper: {
            name: 'Copper Vein',
            stats: {
                maxHealth: 100
            }
        },
        forestGoblin: {
            name: 'Forest Goblin',
            stats: {
                maxHealth: 130,
                attackSpeed: 0.8,
                attackDamage: 15
            },
            //abilityKeys: ['explosiveTrap']
        },
        quillFiend: {
            name: 'Quill Fiend',
            stats: {
                maxHealth: 130,
                attackSpeed: 0.7,
                attackDamage: 16
            }
        },
        direWolf: {
            name: 'Dire Wolf',
            stats: {
                maxHealth: 220,
                attackSpeed: 1.0,
                attackDamage: 25,
                reward: 20
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
        //spider: {
        //    name: 'Spider',
        //    stats: {
        //        maxHealth: 250,
        //        manaRegen: 10,
        //        attackSpeed: 1.2,
        //        attackDamage: 3,
        //        reward: 20
        //    },
        //    abilityKeys: ['webWrap']
        //},
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