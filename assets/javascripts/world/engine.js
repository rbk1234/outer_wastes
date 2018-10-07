/* Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'World.Engine';

    var Engine = function() {};

    Engine.prototype = {
        init: function() {
            this._backgroundCanvas = new Game.Display.Canvas(
                $('#background-canvas')
            );
            this._unitCanvas = new Game.Display.Canvas(
                $('#unit-canvas')
            );
        },

        loadLevel: function(levelId) {
            var self = this;

            this._level = new Game.World.Level(levelId, {});

            this._enemies = this._level.loadEnemies();
            this._allies = [];
            this._allies.push(new Game.World.Ally(1));
            this._allies.push(new Game.World.Ally(1));
            this._allies.push(new Game.World.Ally(1));
            this._level.loadAllies(this._allies);

            Game.BottomBar.setupAllySlots(this._allies);

            this._backgroundCanvas.drawImage(this._level.background());

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, seconds) {
                // Iterate through level updates one by one (cannot batch)
                while (iterations > 0) {
                    iterations--;
                    self._updateLevel(seconds);
                }

                // Only draw once (no matter how many iterations)
                self._drawLevel();
                Game.BottomBar.updateAllySlots(self._allies);
            }, 1.0 / UPDATES_PER_SECOND);
        },

        // should handle updating x coords, moving projectiles, dealing damage, etc.
        _updateLevel: function(seconds) {
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
                console.log('level complete!');
                Game.Clock.clearInterval(CLOCK_KEY);
                // todo need to start another interval to keep updating Player in lobby
                return;
            }

            // TODO Update all projectiles

            // Update allies
            this._allies.forEach(function(ally) {
                ally.update(seconds, self._nearestEnemyUnit());
            });

            // Update enemies
            this._enemies.forEach(function(unit) {
                unit.update(seconds, self._nearestAllyUnit());
            });
        },

        // TODO replace with getting a specific unit
        _nearestAllyUnit: function() {
            for (var i = 0; i < this._allies.length; i++) {
                var ally = this._allies[i];
                if (!ally.isDead()) {
                    return ally;
                }
            }
            return null;
        },
        _nearestEnemyUnit: function() {
            for (var i = 0; i < this._enemies.length; i++) {
                var enemy = this._enemies[i];
                if (!enemy.isDead()) {
                    return enemy;
                }
            }
            return null;
        },

        _drawLevel: function() {
            this._unitCanvas.clearAll();

            var self = this;

            // Don't draw backgroundCanvas

            // Redraw projectileCanvas

            // If ally animation change -> redraw player (just his area)
            this._allies.forEach(function(unit) {
                self._drawUnit(unit);
            });

            // If enemy animation change -> redraw unitCanvas (for that area)
            this._enemies.forEach(function(unit) {
                self._drawUnit(unit);
            });
        },

        _drawUnit: function(unit) {
            this._unitCanvas.drawImage(unit.image(), unit.x(), this._level.height() - unit.height());
        }

    };

    Game.namespace('World').Engine = new Engine();

}(jQuery));
