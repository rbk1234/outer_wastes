
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
            enemies: ['spider', 'spider', 'spider', 'spider', 'spider'],
            events: {
                'room:startEncounters': function() {
                    this.loadEncounter({
                        type: 'periodic',
                        stats: {
                            period: 6,
                            delay: -5
                        },
                        events: {
                            'encounter:periodicTick': function() {
                                // pick highest health computer unit, have it cast webwrap on non-player playerUnits

                                // --- todo maybe this shouldn't be an encounter? just have the spiders emit an event when they
                                // --- todo cast the spell that stops others from casting for a bit

                                var unit = Game.UnitEngine.findUnitForAICast(Game.Constants.teamIds.computer, 'spider', 'webWrap');
                                if (unit) {
                                    unit.castAbility(unit.abilityForDbKey('webWrap'), unit.highestThreatTarget());
                                }
                            }
                        }

                    })
                }
            }
        },
        forest_enemy_4: {
            description: 'A forest goblin ambush!',
            enemies: ['forestGoblin', 'forestGoblin'],
            events: {
                'room:startEncounters': function() {
                    this.loadEncounter({
                        type: 'periodic',
                        stats: {
                            period: 10,
                            delay: -5
                        },
                        events: {
                            'encounter:periodicTick': function() {
                                var unit = Game.UnitEngine.findUnitForAICast(Game.Constants.teamIds.computer, 'forestGoblin', 'iceTrap');
                                if (unit) {
                                    unit.castAbility(unit.abilityForDbKey('iceTrap'), unit.highestThreatTarget());
                                }
                            }
                        }
                    });
                    this.loadEncounter({
                        type: 'periodic',
                        stats: {
                            period: 4,
                            delay: -4
                        },
                        events: {
                            'encounter:periodicTick': function() {
                                var unit = Game.UnitEngine.findUnitForAICast(Game.Constants.teamIds.computer, 'forestGoblin', 'explosiveTrap');
                                if (unit) {
                                    unit.castAbility(unit.abilityForDbKey('explosiveTrap'), unit.highestThreatTarget());
                                }
                            }
                        }
                    });
                }
            }
        }

    };

}(jQuery));