/* Subclass of Unit */

(function ($) {
    'use strict';

    var Ally = function(id, config) {
        Game.World.Unit.call(this, id, config);
    };
    Ally.prototype = Object.create(Game.World.Unit.prototype);
    Ally.prototype.constructor = Ally;

    $.extend(Ally.prototype, {

        _init: function(config) {
            Game.World.Unit.prototype._init.apply(this, arguments);


        },

        kill: function() {
            Game.World.Unit.prototype.kill.apply(this, arguments);

            //Game.Global.statistics.countAllyDeath();
        },

        isAlly: function() {
            return true;
        }

    });

    Game.namespace('World').Ally = Ally;

}(jQuery));