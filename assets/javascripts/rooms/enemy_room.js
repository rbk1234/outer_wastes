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
            this._encounters = {};

            Game.Rooms.Room.prototype.load.apply(this, arguments);
        },

        update: function(seconds) {
            Game.Util.iterateObject(this._encounters, function(id, encounter) {
                if (!encounter) {
                    return; // The encounter may have been deleted while iterating
                }

                encounter.update(seconds);
                //if (encounter.isExpired()) {
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

        startEncounters: function() {
            $(this).trigger('room:startEncounters');
        },

        endEncounters: function() {
            $(this).trigger('room:endEncounters');
        },

        loadEncounter: function(encounterParams) {
            var encounter = this.createEncounter(encounterParams);
            this._encounters[encounter.id] = encounter;
        },

        createEncounter: function(encounterParams) {
            return new Game.Rooms.Encounter($.extend(true, this.defaultEncounterParams(), encounterParams));
        },

        // When this ability spawns an Effect, use these defaults
        defaultEncounterParams: function() {
            return {
                sourceRoom: this
            };
        }


    });

    Game.namespace('Rooms').EnemyRoom = EnemyRoom;






}(jQuery));