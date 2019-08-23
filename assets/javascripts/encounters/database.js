
(function ($) {
    'use strict';

    Game.namespace('Encounters').Database = {
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