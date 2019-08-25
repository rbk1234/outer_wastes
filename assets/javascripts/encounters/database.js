
(function ($) {
    'use strict';

    Game.namespace('Encounters').Database = {

        cobwebs: {
            description: 'You enter a room full of cobwebs.',
            enemies: ['cobweb', 'cobweb', 'cobweb']
        },
        spider: {
            description: 'A giant spider blocks your path.',
            enemies: ['spider', 'cobweb']
        },
        bookshelf: {
            description: 'You find a dusty bookshelf.',
            enemies: ['cobweb', 'bookshelf'],
            onFinish: function() {
                Game.UnitEngine.setTimeout(function() {
                    Game.CombatUI.logMessage('You search the bookshelf for the scrolls...', 'yellow');
                }, 1000);
                if (Game.Quests.quest('bookOfHolyLight').canStart()) {
                    Game.UnitEngine.setTimeout(function() {
                        Game.CombatUI.logMessage('No scrolls here, but there is a strange glowing book...', 'yellow');
                    }, 5000);
                    Game.UnitEngine.setTimeout(function() {
                        Game.CombatUI.logMessage('You pickup the book.', 'yellow');
                        Game.Quests.quest('bookOfHolyLight').start();
                        Game.Quests.quest('bookOfHolyLight').fulfill();
                    }, 7000);
                    Game.UnitEngine.setTimeout(function() {
                        Game.UnitEngine.standardEncounterFinish();
                    }, 8000);
                }
                else {
                    Game.UnitEngine.setTimeout(function() {
                        Game.CombatUI.logMessage("You don't find anything useful.", 'yellow');
                    }, 5000);
                    Game.UnitEngine.setTimeout(function() {
                        Game.UnitEngine.standardEncounterFinish();
                    }, 7000);
                }
            }
        },
        rat: {
            description: 'An enormous rat scurries out of the darkness.',
            enemies: ['rat']
        },
        desk: {
            description: 'You find a desk covered in scrolls.',
            enemies: ['desk']
        },


        mushrooms: {
            description: 'You find a patch of wild mushrooms.',
            enemies: ['mushroom', 'mushroom', 'mushroom'],
        },
        boar: {
            description: 'A boar charges out of the bushes!',
            enemies: ['boar']
        },
        wolf: {
            description: 'A wolf is stalking the area.',
            enemies: ['wolf']
        },
        cubs: {
            description: 'A pair of bear cubs are inhabiting the area.',
            enemies: ['cub', 'cub']
        },

        whiteTree: {
            
        },

        copper: {
            description: 'You find a vein of copper ore.',
            enemies: ['copper']
        },
        forestGoblins: {
            description: 'A forest goblin ambush!',
            enemies: ['forestGoblin', 'forestGoblin'],
            events: {
                'encounter:startAIs': function() {
                    this.loadAI({
                        type: 'periodic',
                        stats: {
                            period: 10,
                            delay: -5
                        },
                        events: {
                            'AI:periodicTick': function() {
                                //var unit = Game.UnitEngine.findUnitForAICast(Game.Constants.teamIds.computer, 'forestGoblin', 'iceTrap');
                                //if (unit) {
                                //    unit.castAbility(unit.abilityForDbKey('iceTrap'), unit.highestThreatTarget());
                                //}
                            }
                        }
                    });
                    this.loadAI({
                        type: 'periodic',
                        stats: {
                            period: 4,
                            delay: -4
                        },
                        events: {
                            'AI:periodicTick': function() {
                                //var unit = Game.UnitEngine.findUnitForAICast(Game.Constants.teamIds.computer, 'forestGoblin', 'explosiveTrap');
                                //if (unit) {
                                //    unit.castAbility(unit.abilityForDbKey('explosiveTrap'), unit.highestThreatTarget());
                                //}
                            }
                        }
                    });
                }
            }
        },
        quillFiend: {
            description: 'A quill fiend attacks your party.',
            enemies: ['quillFiend']
        },
        wolves: {
            description: 'A pack of wolves is inhabiting the area.',
            enemies: ['wolf', 'wolf', 'wolf']
        },
        boars: {
            description: 'A pair of boars charges your party.',
            enemies: ['boar', 'boar']
        },
        direWolf: {
            description: 'A dire wolf is stalking the area.',
            enemies: ['direWolf']
        },


        forest_wolves: {
            description: 'A pack of wolves is inhabiting the area.',
            enemies: ['wolf', 'wolf', 'wolf', 'wolf'],
            goldReward: 5
        },
        forest_direWolf: {
            description: 'A dire wolf is stalking the area.',
            enemies: ['direWolf']
        },
        forest_spiders: {
            description: 'Spiders swarm around your party.',
            enemies: ['spider', 'spider', 'spider', 'spider', 'spider'],
            events: {
                'encounter:startAIs': function() {
                    this.loadAI({
                        type: 'periodic',
                        stats: {
                            period: 6,
                            delay: -5
                        },
                        events: {
                            'AI:periodicTick': function() {
                                // pick highest health computer unit, have it cast webwrap on non-player playerUnits

                                // --- todo maybe this shouldn't be an AI? just have the spiders emit an event when they
                                // --- todo cast the spell that stops others from casting for a bit

                                //var unit = Game.UnitEngine.findUnitForAICast(Game.Constants.teamIds.computer, 'spider', 'webWrap');
                                //if (unit) {
                                //    unit.castAbility(unit.abilityForDbKey('webWrap'), unit.highestThreatTarget());
                                //}
                            }
                        }

                    })
                }
            }
        },
        forest_grizzlies: {
            description: 'You come upon a grizzly den.',
            enemies: ['bear', 'bearCub', 'bearCub']
        },


    };

}(jQuery));