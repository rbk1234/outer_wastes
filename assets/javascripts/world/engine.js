/* Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var LEVEL_HEIGHT = 20;
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
            }, 1.0 / UPDATES_PER_SECOND);
        },

        // should handle updating x coords, moving projectiles, dealing damage, etc.
        _updateLevel: function(seconds) {
            var self = this;

            // check if complete
            var allEnemiesDead = true;
            this._level.units().forEach(function(unit) {
                if (!unit.isDead()) {
                    allEnemiesDead = false;
                }
            });
            if (Game.World.Player.isDead() || allEnemiesDead) {
                // todo level complete!
                console.log('level complete!');
                Game.Clock.clearInterval(CLOCK_KEY);
                // todo need to start another interval to keep updating Player in lobby
                return;
            }

            // Update all projectiles

            // Update player
            Game.World.Player.update(seconds, self._level.nearestEnemyUnit());

            // Update all units
            this._level.units().forEach(function(unit) {
                unit.update(seconds, Game.World.Player);
            });
        },

        _drawLevel: function() {
            this._unitCanvas.clearAll();

            var self = this;

            // Don't draw backgroundCanvas

            // Redraw projectileCanvas

            // If player animation change -> redraw player (just his area)
            this._drawUnit(Game.World.Player);

            // If a unit animation change -> redraw unitCanvas (for that area)
            this._level.units().forEach(function(unit) {
                self._drawUnit(unit);
            });
        },

        _drawUnit: function(unit) {
            this._unitCanvas.drawImage(unit.image(), unit.x(), LEVEL_HEIGHT - unit.height());
        }

    };

    Game.namespace('World').Engine = new Engine();

}(jQuery));
