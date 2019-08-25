/* Saving about the current game session */
/* Singleton */

(function ($) {
    'use strict';

    var LOCAL_STORAGE_KEY = 'save';
    var CLOCK_KEY = 'Saving';

    var Saving = function() {};

    Saving.prototype = {

        init: function() {
            this.turnOnAutoSave();
        },

        save: function() {
            var data = {};

            // Save all classes
            data.clock = Game.Clock.saveData();
            data.settings = Game.Settings.saveData();
            data.resourceEngine = Game.ResourceEngine.saveData();
            data.quests = Game.Quests.saveData();
            data.spellbook = Game.Spellbook.saveData();
            data.party = Game.PartyUI.saveData();
            data.town = Game.TownUI.saveData();
            // todo all the other classes

            data.misc = this.miscData || {};

            // Bundle and save to localStorage
            data.savedAt = Date.now();
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

            this.savedAt = data.savedAt;
            console.log('Game saved at:', new Date());
        },

        load: function() {
            var data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

            if (data === null) {
                console.warn('No save file detected.');
                return;
            }

            // Load all classes
            Game.Clock.loadData(data.clock);
            Game.Settings.loadData(data.settings);
            Game.ResourceEngine.loadData(data.resourceEngine);
            Game.Quests.loadData(data.quests);
            Game.Spellbook.loadData(data.spellbook);
            Game.PartyUI.loadData(data.party);
            Game.TownUI.loadData(data.town);
            // todo all the other classes

            this.miscData = data.misc || {};

            // Success message
            this.savedAt = data.savedAt;
            console.log('Game loaded. Last save was:', (this.savedAt ? new Date(this.savedAt) : '(Unknown)'));
        },

        clear: function() {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        },

        turnOnAutoSave: function() {
            var self = this;

            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                self.save();
            }, 60.0 * Game.Settings.getSetting('autoSaveEvery'), true);
        },

        turnOffAutoSave: function() {
            Game.Clock.clearInterval(CLOCK_KEY);
        },


        saveMiscData: function(group, key, value) {
            if (!this.miscData[group]) {
                this.miscData[group] = {};
            }

            this.miscData[group][key] = value;
        },

        readMiscData: function(group, key) {
            if (!this.miscData[group]) {
                return undefined;
            }

            return this.miscData[group][key];
        }

    };

    Game.Saving = new Saving();

}(jQuery));