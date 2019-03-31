
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

                                var highestHealthUnit = null;
                                Game.UnitEngine.findUnitsByDbKey(Game.Constants.teamIds.computer, 'spider').forEach(function(unit) {
                                    var webWrap = unit.abilityForDbKey('webWrap');
                                    if (!webWrap.isReady()) {
                                        return;
                                    }

                                    if (highestHealthUnit) {
                                        if (unit.health > highestHealthUnit.health) {
                                            highestHealthUnit = unit;
                                        }
                                    }
                                    else {
                                        highestHealthUnit = unit;
                                    }
                                });
                                if (highestHealthUnit) {
                                    highestHealthUnit.castAbility(highestHealthUnit.abilityForDbKey('webWrap'), highestHealthUnit.highestThreatTarget());
                                }
                            }
                        }

                    })
                }
            }
        },
        forest_enemy_4: {
            description: 'A forest goblin ambush!',
            enemies: ['forestGoblin', 'forestGoblin']
        }

    };

}(jQuery));