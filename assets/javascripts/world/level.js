
(function($) {
    'use strict';

    var Level = function(id, config) {
        this._init(id, config);
    };
    Level.prototype = {

        _defaultConfig: {

        },

        _init: function(id, config) {
            var self = this;

            this._dbRecord = $.extend(true, {}, Game.Database.Levels[id]);

            // load player
            Game.World.Player.x(this._dbRecord.playerX);

            // load units
            this._units = [];
            this._dbRecord.units.forEach(function(unitRecord) {
                var unit = new Game.World.Unit(unitRecord.id);
                unit.x(unitRecord.x);
                self._units.push(unit);
            });
        },

        background: function() {
            return this._dbRecord.background;
        },

        units: function() {
            return this._units;
        },

        nearestEnemyUnit: function() {
            var nearestUnit = null;
            this.units().forEach(function(unit) {
                if (unit.isDead()) {
                    return; // skip
                }
                if (nearestUnit === null || unit.x() < nearestUnit.x()) {
                    nearestUnit = unit;
                }
            });
            return nearestUnit;
        }

    };

    Game.namespace('World').Level = Level;

}(jQuery));
