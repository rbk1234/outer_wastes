/* Subclass of Unit */

(function ($) {
    'use strict';
    
    var Enemy = function(id, config) {
        Game.World.Unit.call(this, id, config);
    };
    Enemy.prototype = Object.create(Game.World.Unit.prototype);
    Enemy.prototype.constructor = Enemy;

    $.extend(Enemy.prototype, {

        _init: function(config) {
            Game.World.Unit.prototype._init.apply(this, arguments);


        },

        kill: function() {
            Game.World.Unit.prototype.kill.apply(this, arguments);

            //Game.Global.statistics.countEnemyDeath();
        },

        isEnemy: function() {
            return true;
        }

    });

    Game.namespace('World').Enemy = Enemy;

}(jQuery));