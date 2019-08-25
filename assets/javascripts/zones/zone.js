
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'Unknown',
        groups: [],
        uniqueEncounters: [],
        background: '',
        onFinish: null
    };

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
            this.$eventHandler = $(this);
            $.extend(true, this, DEFAULTS, Game.Zones.Database[dbKey], config);
            Game.Util.initStats(this);
            Game.Util.initEvents(this);

            this.encounterIndex = 0;
            this._clearedKeys = [];

            Game.BackgroundUI.drawBackground(this.background);
            Game.BackgroundUI.setZoneName(this.name);
            Game.CombatUI.logMessage('You have entered ' + this.name + '.', 'yellow');
        },

        loadNextEncounter: function() {
            var i, len;

            // Check for unique encounter
            for (i = 0, len = this.uniqueEncounters.length; i < len; i++) {
                var encounterData = this.uniqueEncounters[i];
                if (this.encounterIndex === encounterData.index &&
                    !Game.Saving.readMiscData('uniqueEncounters', encounterData.encounter)) {

                    Game.UnitEngine.loadEncounterByDbKey(encounterData.encounter);
                    return;
                }
            }

            // Else pull random encounter from group
            var maxIndexForGroup = 0;
            for (i = 0, len = this.groups.length; i < len; i++) {
                var group = this.groups[i];
                maxIndexForGroup += group.amount;
                if (this.encounterIndex < maxIndexForGroup) {
                    var availableEncounters = Game.Util.arrayDifference(group.encounters, this._clearedKeys);
                    Game.UnitEngine.loadEncounterByDbKey(Game.Util.randomFromArray(availableEncounters));
                    return;
                }
            }

            // zone complete:
            // todo zone loot
            if (this.onFinish) {
                this.onFinish();
            }
            Game.TownUI.loadAbbey();
        },

        totalEncounters: function() {
            var count = 0;

            for (var i = 0; i < this.groups.length; i++) {
                var group = this.groups[i];
                count += group.amount;
            }

            return count;
        },

        encounterComplete: function(encounter) {
            this.encounterIndex += 1;
            this._clearedKeys.push(encounter.dbKey);

            if (Game.Util.inArray(encounter.dbKey, this._uniqueEncounterKeys())) {
                Game.Saving.saveMiscData('uniqueEncounters', encounter.dbKey, true);
            }
        },

        _uniqueEncounterKeys: function() {
            return this.uniqueEncounters.map(function(encounterData) {
                return encounterData.encounter;
            });
        }

    };

    Game.namespace('Zones').Zone = Zone;

}(jQuery));
