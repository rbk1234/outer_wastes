/* Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'UnitEngine';

    var UnitEngine = function() {};

    UnitEngine.prototype = {
        init: function() {
            var self = this;

            this._teams = {}; // team id -> [Units on that team]

            // Start clock
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

        highestThreatEnemy: function(unit) {
            return this.highestThreatOnTeam(this.opposingTeamId(unit.teamId));
        },

        // TODO Just returning first in array atm
        highestThreatOnTeam: function(teamId) {
            var units = this.unitsForTeam(teamId);

            for (var i = 0; i < units.length; i++) {
                var unit = units[i];
                if (!unit.isDead()) {
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

        _update: function(seconds) {
            var playerTeamAlive = this.unitsForTeam(Game.Constants.teamIds.player).some(function(unit) {
                return !unit.isDead();
            });
            var computerTeamAlive = this.unitsForTeam(Game.Constants.teamIds.computer).some(function(unit) {
                return !unit.isDead();
            });
            if (!playerTeamAlive || !computerTeamAlive) {
                // todo level complete!
                //console.log('stop');
                //this.clearEnemies();
            }

            Game.Util.iterateObject(this._teams, function(teamId, units) {
                units.forEach(function(unit) {
                    unit.update(seconds);
                });
            });
        }
    };

    Game.UnitEngine = new UnitEngine();

}(jQuery));
