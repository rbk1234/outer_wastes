/* Subclass of Unit */

(function ($) {
    'use strict';

    var Ally = function(dbKey, config) {
        Game.Units.Unit.call(this, dbKey, config);
    };
    Ally.prototype = Object.create(Game.Units.Unit.prototype);
    Ally.prototype.constructor = Ally;

    $.extend(Ally.prototype, {

        _init: function(config) {
            Game.Units.Unit.prototype._init.apply(this, arguments);


        },

        highestThreatTarget: function() {
            return Game.UnitEngine.highestThreatEnemy();
        },

        kill: function() {
            Game.Units.Unit.prototype.kill.apply(this, arguments);

            //Game.Global.statistics.countAllyDeath();
        },

        isAlly: function() {
            return true;
        }

    });

    Game.namespace('Units').Ally = Ally;

}(jQuery));