/* Subclass of Unit */

(function ($) {
    'use strict';
    
    var Enemy = function(dbKey, config) {
        Game.Units.Unit.call(this, dbKey, config);
    };
    Enemy.prototype = Object.create(Game.Units.Unit.prototype);
    Enemy.prototype.constructor = Enemy;

    $.extend(Enemy.prototype, {

        _init: function(config) {
            Game.Units.Unit.prototype._init.apply(this, arguments);


        },

        highestThreatTarget: function() {
            return Game.UnitEngine.highestThreatAlly();
        },

        kill: function() {
            Game.Units.Unit.prototype.kill.apply(this, arguments);

            //Game.Global.statistics.countEnemyDeath();
        },

        isEnemy: function() {
            return true;
        }

    });

    Game.namespace('Units').Enemy = Enemy;

}(jQuery));