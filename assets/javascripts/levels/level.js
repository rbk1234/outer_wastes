
(function($) {
    'use strict';

    var DEFAULTS = {};

    var currentId = 1;

    var Level = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Level.prototype = {

        _defaultConfig: {

        },

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Levels.Database[dbKey], config);
            Game.Util.initStats(this);

            this._currentRoomIndex = 0; // Note: 1-based

            Game.Levels.currentLevel = this; // todo where to store this?
        },

        loadRandomEnemyRoom: function() {
            this._loadRoom(Game.Util.randomFromArray(this.enemyRooms))
        },

        currentRoomIndex: function() {
            return this._currentRoomIndex;
        },

        _loadRoom: function(roomDbKey) {
            Game.UnitEngine.clearTeam(Game.Constants.teamIds.computer);

            this._currentRoomIndex += 1;

            var room = new Game.Rooms.EnemyRoom(roomDbKey);
            room.load();
        }

    };

    Game.namespace('Levels').Level = Level;

}(jQuery));
