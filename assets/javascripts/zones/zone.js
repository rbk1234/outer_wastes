
(function($) {
    'use strict';

    var DEFAULTS = {};

    var currentId = 1;

    var Zone = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Zone.prototype = {

        _defaultConfig: {

        },

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Zones.Database[dbKey], config);
            Game.Util.initStats(this);

            this._encountersCleared = 0;

            Game.BackgroundUI.drawBackground(this.background);
            Game.BackgroundUI.setZoneName(this.name);
        },

        loadNextEncounter: function() {
            if (this._encountersCleared >= this.encounters.length) {
                // todo loot
                Game.TownUI.loadTown();
            }
            else {
                Game.UnitEngine.loadEncounterByDbKey(this.encounters[this._encountersCleared]);
                //Game.UnitEngine.loadEncounterByDbKey(Game.Util.randomFromArray(this.encounters));
            }

        },

        encounterComplete: function() {
            this._encountersCleared += 1;
        }

    };

    Game.namespace('Zones').Zone = Zone;

}(jQuery));
