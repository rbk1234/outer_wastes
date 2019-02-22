/* Subclass of Room */

(function ($) {
    'use strict';

    var EnemyRoom = function(dbKey, config) {
        Game.Rooms.Room.call(this, dbKey, config);
    };
    EnemyRoom.prototype = Object.create(Game.Rooms.Room.prototype);
    EnemyRoom.prototype.constructor = EnemyRoom;

    $.extend(EnemyRoom.prototype, {

        _init: function(config) {
            Game.Rooms.Room.prototype._init.apply(this, arguments);

            this._loadEnemies();
        },

        //kill: function() {
        //    Game.Rooms.Room.prototype.kill.apply(this, arguments);
        //
        //},

        _loadEnemies: function() {
            var self = this;

            this.enemies.forEach(function(enemyDbKey) {
                Game.UnitEngine.addUnit(new Game.Units.Unit(enemyDbKey, {teamId: Game.Constants.teamIds.computer}));

            });

            Game.UserInterface.loadUnits();
        }

    });

    Game.namespace('Rooms').EnemyRoom = EnemyRoom;

}(jQuery));