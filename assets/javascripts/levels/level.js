
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
            this._currentRoom = null;

            Game.Levels.currentLevel = this; // todo where to store this?
        },

        loadNextRoom: function() {
            //console.log('loading room: ', this._currentRoomIndex);

            //this._loadRandomEnemyRoom();
            this._loadRoom(this.enemyRooms[this._currentRoomIndex]);
        },

        _loadRandomEnemyRoom: function() {
            this._loadRoom(Game.Util.randomFromArray(this.enemyRooms))
        },

        currentRoom: function() {
            return this._currentRoom;
        },

        currentRoomIndex: function() {
            return this._currentRoomIndex;
        },

        _loadRoom: function(roomDbKey) {
            Game.UnitEngine.clearTeam(Game.Constants.teamIds.computer);

            this._currentRoomIndex += 1;

            this._currentRoom = new Game.Rooms.EnemyRoom(roomDbKey);
            this._currentRoom.load();
        }

    };

    Game.namespace('Levels').Level = Level;

}(jQuery));
