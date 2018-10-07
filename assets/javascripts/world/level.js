
(function($) {
    'use strict';

    var Level = function(id, config) {
        this._init(id, config);
    };
    Level.prototype = {

        _defaultConfig: {

        },

        _init: function(id, config) {
            this._dbRecord = $.extend(true, {}, Game.Database.Levels[id]);
        },

        background: function() {
            return this._dbRecord.background;
        },

        height: function() {
            return this._dbRecord.height;
        },

        loadEnemies: function() {
            var enemies = [];

            this._dbRecord.enemies.forEach(function(enemyInfo) {
                var enemy = new Game.World.Unit(enemyInfo.id);
                enemy.x(enemyInfo.x);
                enemies.push(enemy);
            });

            return enemies;
        },

        // allies already exist, so pass as parameter
        loadAllies: function(allies) {
            this._dbRecord.allies.forEach(function(allyInfo, index) {
                var ally = allies[index];
                if (ally) {
                    ally.x(allyInfo.x);
                }
            });
        }

    };

    Game.namespace('World').Level = Level;

}(jQuery));
