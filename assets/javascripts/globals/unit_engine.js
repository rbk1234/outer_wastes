/* Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'UnitEngine';

    var UnitEngine = function() {};

    UnitEngine.prototype = {
        init: function() {
            var self = this;

            this._allies = [];
            this._enemies = [];

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, seconds) {
                while (iterations > 0) {
                    //if (self._enemies.length) {
                        // If there are enemies, iterate through updates one by one (cannot batch)
                        self._update(seconds);
                        iterations--;
                    //}
                    //else {
                    //    // If no ememies, ok to batch updates
                    //    self._update(seconds * iterations);
                    //    iterations -= iterations;
                    //}
                }

                // Only draw once (no matter how many iterations)
                //self._refreshUnitFrames();
                //Game.UserInterface.update();

            }, 1.0 / UPDATES_PER_SECOND);
        },
        
        addAlly: function(ally) {
            this._allies.push(ally);
        },
        addEnemy: function(enemy) {
            this._enemies.push(enemy);
        },
        clearEnemies: function() {
            this._enemies = [];
        },
        allies: function() {
            return this._allies;
        },
        enemies: function() {
            return this._enemies;
        },

        // TODO Just returning first in array atm
        highestThreatAlly: function() {
            for (var i = 0; i < this._allies.length; i++) {
                var ally = this._allies[i];
                if (!ally.isDead()) {
                    return ally;
                }
            }
            return null;
        },

        // TODO Just returning first in array atm
        highestThreatEnemy: function() {
            for (var i = 0; i < this._enemies.length; i++) {
                var enemy = this._enemies[i];
                if (!enemy.isDead()) {
                    return enemy;
                }
            }
            return null;
        },

        // should handle regenning health, mana, cooldowns, attacking dealing damage, etc.
        _update: function(seconds) {
            var self = this;

            // check if complete
            var allAlliesDead = true;
            var allEnemiesDead = true;
            this._allies.forEach(function(ally) {
                if (!ally.isDead()) {
                    allAlliesDead = false;
                }
            });
            this._enemies.forEach(function(enemy) {
                if (!enemy.isDead()) {
                    allEnemiesDead = false;
                }
            });

            if (allAlliesDead || allEnemiesDead) {
                // todo level complete!
                //console.log('stop');
                //this.clearEnemies();
            }

            // Update allies
            this._allies.forEach(function(ally) {
                ally.update(seconds);
            });

            // Update enemies
            this._enemies.forEach(function(enemy) {
                enemy.update(seconds);
            });
        }
    };

    Game.UnitEngine = new UnitEngine();

}(jQuery));
