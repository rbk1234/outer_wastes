/* Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'UnitEngine';

    var UnitEngine = function() {};

    UnitEngine.prototype = {
        init: function() {
            Game.Timers.addTimerSupport(this);
        },

        loadEngine: function() {
            this._teams = {}; // team id -> [Units on that team]
            this._currentEncounter = null;
            this._inCombat = false;

            this._running = true;
            this._startClock();
        },

        stopEngine: function() {
            // TODO HACK
            // Stopping the clock isn't enough to stop the engine; if the tab was in the background, the _update loop
            // could run many times in a single interval. So we have a secondary _running attribute that can be used
            // to stop the engine even within the _update loop.
            this._running = false;
            this._stopClock();
        },


        _startClock: function() {
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
        _stopClock: function() {
            Game.Clock.clearInterval(CLOCK_KEY);
        },

        loadEncounterByDbKey: function(encounterDbKey) {
            var self = this;

            Game.CurrentEncounter = new Game.Encounters.EnemyEncounter(encounterDbKey);
            Game.CurrentEncounter.load();

            this.setTimeout(function() {
                self.countdownToEncounter();
            }, 2000);
        },

        // Adding unit to the game. Make sure
        addUnit: function(unit) {
            if (!this._teams[unit.teamId]) {
                this._teams[unit.teamId] = [];
            }
            this._teams[unit.teamId].push(unit);

            if (unit.id === Game.Player.id) {
                Game.Player.addMana(Game.Player.maxMana());
            }
            // todo remove debuffs / set health full?
            unit.leaveCombat();
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

            if (Game.CurrentEncounter) {
                Game.CurrentEncounter.startAIs();
            }

            Game.CombatUI.encounterStarted();
        },
        leaveCombat: function() {
            this._inCombat = false;

            this.unitsForTeam(Game.Constants.teamIds.player).forEach(function(unit) {
                unit.leaveCombat();
            });
            this.unitsForTeam(Game.Constants.teamIds.computer).forEach(function(unit) {
                unit.leaveCombat();
            });

            if (Game.CurrentEncounter) {
                Game.CurrentEncounter.endAIs();
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
            Game.CombatUI.setCenterImage(Game.UI.Centerpieces.three.image);

            this.setTimeout(function() {
                Game.CombatUI.setCenterImage(Game.UI.Centerpieces.two.image);
            }, 1000);
            this.setTimeout(function() {
                Game.CombatUI.setCenterImage(Game.UI.Centerpieces.one.image);
            }, 2000);
            this.setTimeout(function() {
                Game.CombatUI.setCenterImage(Game.UI.Centerpieces.battle.image);
                Game.UnitEngine.enterCombat();
            }, 3000);
            this.setTimeout(function() {
                Game.CombatUI.clearCenterImage();
            }, 4000);
        },

        _update: function(seconds) {
            var self = this;
            
            if (!this._running) {
                return;
            }

            if (Object.keys(this._teams).length === 0) {
                return; // waiting on a team to be loaded
            }

            if (!this.isPlayerTeamAlive()) {
                Game.CombatUI.encounterFailed();
                this.leaveCombat();

                // todo wait then clear teams?
                //self.clearTeam(Game.Constants.teamIds.computer);

                this.stopEngine();
            }
            if (this.inCombat() && !this.isComputerTeamAlive()) {
                Game.CurrentEncounter.finish();
                Game.CurrentZone.encounterComplete();
                Game.CombatUI.encounterComplete();
                this.leaveCombat();
                this.setTimeout(function() {
                    self.clearTeam(Game.Constants.teamIds.computer);
                    Game.CurrentZone.loadNextEncounter();
                }, 2000);
            }

            Game.Util.iterateObject(this._teams, function(teamId, units) {
                units.forEach(function(unit) {
                    unit.update(seconds);
                });
            });

            if (Game.CurrentEncounter) {
                Game.CurrentEncounter.update(seconds);
            }

            this.updateTimers(seconds);
        }

    };

    Game.UnitEngine = new UnitEngine();

}(jQuery));
