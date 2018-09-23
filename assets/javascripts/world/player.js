/* Subclass of Unit */
/* Singleton */

(function ($) {
    'use strict';

    var PLAYER_ID = 1;

    var Player = function() {
        Game.World.Unit.call(this, PLAYER_ID, {});
    };
    Player.prototype = Object.create(Game.World.Unit.prototype);
    Player.prototype.constructor = Player;

    $.extend(Player.prototype, {

        _init: function(config) {
            Game.World.Unit.prototype._init.apply(this, arguments);

        },

        kill: function() {
            Game.World.Unit.prototype.kill.apply(this, arguments);

            //Game.Global.statistics.countPlayerDeath();
        },

        isPlayer: function() {
            return true;
        }

    });

    Game.namespace('World').Player = new Player();

}(jQuery));