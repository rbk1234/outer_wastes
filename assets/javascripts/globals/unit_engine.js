/* Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'UnitEngine';

    var UnitEngine = function() {};

    UnitEngine.prototype = {
        init: function() {

            this._teams = {}; // team id -> [Units on that team]

            Game.Timers.addTimerSupport(this);
            
            this._inCombat = false;
            this._currentEncounter = null;

            this.startClock();
        },

        startClock: function() {
            var self = this;

            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                while (iterations > 0) {
                    //if (self._enemies.length) {
                    // If there are enemies, iterate through updates one by one (cannot batch)
                    self._update(period);
                    iterations--;
                    //}
                    //else {
                    //    // If no ememies, ok to batch updates
                    //    self._update(seconds * iterations);
                    //    iterations -= iterations;
                    //}
                }
            }, 1.0 / UPDATES_PER_SECOND);

        },
        stopClock: function() {
            Game.Clock.clearInterval(CLOCK_KEY);
        },

        loadTile: function(tile) {
            var encounter = Game.Util.randomFromArray(tile.encounters);
            if (encounter) {
                this.loadEncounterByDbKey(encounter);
            }
            else {
                // TODO Tile is not yet implemented
                this.clearTeam(Game.Constants.teamIds.computer);
                Game.UserInterface.encounterComplete();
                Game.UserInterface.newEncounterLoaded({description: '[Not yet implemented]'});
                this.setTimeout(function() {
                    Game.UserInterface.showMiniMap();
                }, 2000);
            }
        },
        loadEncounterByDbKey: function(encounterDbKey) {
            var self = this;

            this.clearTeam(Game.Constants.teamIds.computer);
            this._currentEncounter = new Game.Encounters.EnemyEncounter(encounterDbKey);
            this._currentEncounter.load();

            this.setTimeout(function() {
                self.countdownToEncounter();
            }, 2000);
        },

        addUnit: function(unit) {
            if (!this._teams[unit.teamId]) {
                this._teams[unit.teamId] = [];
            }
            this._teams[unit.teamId].push(unit);
        },

        clearTeam: function(teamId) {
            delete this._teams[teamId];
        },

        unitsForTeam: function(teamId) {
            return this._teams[teamId] || [];
        },

        // todo this method name is not entirely accurate...
        highestThreatEnemy: function(unit) {
            if (!this.inCombat()) {
                return null;
            }

            return this.highestThreatOnTeam(this.opposingTeamId(unit.teamId));
        },

        highestThreatOnTeam: function(teamId) {
            var units = this.unitsForTeam(teamId);

            for (var i = 0; i < units.length; i++) {
                var unit = units[i];

                if (unit.isDead()) {
                    continue;
                }

                if (Math.random() < unit.threat.value()) {
                    return unit;
                }
            }
            return null;
        },

        opposingTeamId: function(teamId) {
            return teamId === Game.Constants.teamIds.player ? Game.Constants.teamIds.computer : Game.Constants.teamIds.player;
        },

        indexOfUnit: function(searchUnit) {
            if (!searchUnit) {
                return null;
            }

            var units = Game.UnitEngine.unitsForTeam(searchUnit.teamId);

            for (var i = 0; i < units.length; i++) {
                if (units[i].id === searchUnit.id) {
                    return i;
                }
            }
            return null;
        },

        findUnitsByDbKey: function(teamId, unitDbKey) {
            var matchingUnits = [];
            var units = this.unitsForTeam(teamId);
            for (var i = 0; i < units.length; i++) {
                if (units[i].dbKey === unitDbKey) {
                    matchingUnits.push(units[i]);
                }
            }
            return matchingUnits;
        },

        // todo very simple for now. just finds highest health unit that can cast the ability
        findUnitForAICast: function(teamId, unitDbKey, abilityDbKey) {
            var matchingUnit = null;

            Game.UnitEngine.findUnitsByDbKey(Game.Constants.teamIds.computer, unitDbKey).forEach(function(unit) {
                var ability = unit.abilityForDbKey(abilityDbKey);
                if (!ability.isReady()) {
                    return;
                }

                if (matchingUnit) {
                    if (unit.health > matchingUnit.health) {
                        matchingUnit = unit;
                    }
                }
                else {
                    matchingUnit = unit;
                }
            });

            return matchingUnit;
        },

        inCombat: function() {
            return this._inCombat;
        },
        enterCombat: function() {
            this._inCombat = true;

            this.unitsForTeam(Game.Constants.teamIds.player).forEach(function(unit) {
                unit.enterCombat();
            });
            this.unitsForTeam(Game.Constants.teamIds.computer).forEach(function(unit) {
                unit.enterCombat();
            });

            if (this._currentEncounter) {
                this._currentEncounter.startAIs();
            }

            Game.UserInterface.encounterStarted();
        },
        leaveCombat: function() {
            this._inCombat = false;

            this.unitsForTeam(Game.Constants.teamIds.player).forEach(function(unit) {
                unit.leaveCombat();
            });
            this.unitsForTeam(Game.Constants.teamIds.computer).forEach(function(unit) {
                unit.leaveCombat();
            });

            if (this._currentEncounter) {
                this._currentEncounter.endAIs();
            }
        },
        isPlayerTeamAlive: function() {
            return this._isTeamAlive(Game.Constants.teamIds.player);
        },
        isComputerTeamAlive: function() {
            return this._isTeamAlive(Game.Constants.teamIds.computer);
        },
        _isTeamAlive: function(teamId) {
            return this.unitsForTeam(teamId).some(function(unit) {
                return !unit.isDead();
            });
        },

        countdownToEncounter: function() {
            Game.UserInterface.setCenterImage(Game.Levels.Centerpieces.three.image);

            this.setTimeout(function() {
                Game.UserInterface.setCenterImage(Game.Levels.Centerpieces.two.image);
            }, 1000);
            this.setTimeout(function() {
                Game.UserInterface.setCenterImage(Game.Levels.Centerpieces.one.image);
            }, 2000);
            this.setTimeout(function() {
                Game.UserInterface.setCenterImage(Game.Levels.Centerpieces.battle.image);
                Game.UnitEngine.enterCombat();
            }, 3000);
            this.setTimeout(function() {
                Game.UserInterface.clearCenterImage();
            }, 4000);
        },

        _update: function(seconds) {
            var self = this;

            if (!this.isPlayerTeamAlive()) {
                Game.UserInterface.encounterFailed();
                this.leaveCombat();
                this.stopClock();
            }
            if (this.inCombat() && !this.isComputerTeamAlive()) {
                Game.UserInterface.encounterComplete();
                this.leaveCombat();
                this.setTimeout(function() {
                    Game.UserInterface.showMiniMap();
                }, 2000);
            }

            Game.Util.iterateObject(this._teams, function(teamId, units) {
                units.forEach(function(unit) {
                    unit.update(seconds);
                });
            });

            if (this._currentEncounter) {
                this._currentEncounter.update(seconds);
            }

            this.updateTimers(seconds);
        }

    };

    Game.UnitEngine = new UnitEngine();

}(jQuery));
