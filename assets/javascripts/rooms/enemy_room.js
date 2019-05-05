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
            this._AIs = {};

            Game.Rooms.Room.prototype.load.apply(this, arguments);
        },

        update: function(seconds) {
            Game.Util.iterateObject(this._AIs, function(id, AI) {
                if (!AI) {
                    return; // The AI may have been deleted while iterating
                }

                AI.update(seconds);
                //if (AI.isExpired()) {
                //    todo delete
                //}
            });
        },

        _loadEnemies: function() {
            this.enemies.forEach(function(enemyDbKey) {
                var unit = new Game.Units.Unit(enemyDbKey, {teamId: Game.Constants.teamIds.computer});
                Game.UnitEngine.addUnit(unit);
            });

            Game.UserInterface.loadTeam(Game.Constants.teamIds.computer);
        },

        startAIs: function() {
            $(this).trigger('room:startAIs');
        },

        endAIs: function() {
            $(this).trigger('room:endAIs');
        },

        loadAI: function(AIParams) {
            var AI = this.createAI(AIParams);
            this._AIs[AI.id] = AI;
        },

        createAI: function(AIParams) {
            return new Game.Rooms.AI($.extend(true, this.defaultAIParams(), AIParams));
        },

        // When this ability spawns an Effect, use these defaults
        defaultAIParams: function() {
            return {
                sourceRoom: this
            };
        }


    });

    Game.namespace('Rooms').EnemyRoom = EnemyRoom;






}(jQuery));