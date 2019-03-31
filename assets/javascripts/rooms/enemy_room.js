/* Subclass of Room */

(function ($) {
    'use strict';

    var EnemyRoom = function(dbKey, config) {
        Game.Rooms.Room.call(this, dbKey, config);
    };
    EnemyRoom.prototype = Object.create(Game.Rooms.Room.prototype);
    EnemyRoom.prototype.constructor = EnemyRoom;

    $.extend(EnemyRoom.prototype, {

        load: function() {
            this._loadEnemies();

            Game.Rooms.Room.prototype.load.apply(this, arguments);
        },

        _loadEnemies: function() {
            this.enemies.forEach(function(enemyDbKey) {
                var unit = new Game.Units.Unit(enemyDbKey, {teamId: Game.Constants.teamIds.computer});
                Game.UnitEngine.addUnit(unit);
                console.log('loaded unit' + unit.id);
            });

            Game.UserInterface.loadTeam(Game.Constants.teamIds.computer);
        }

    });

    Game.namespace('Rooms').EnemyRoom = EnemyRoom;

}(jQuery));