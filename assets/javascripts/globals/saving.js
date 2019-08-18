/* Saving about the current game session */
/* Singleton */

(function ($) {
    'use strict';

    var LOCAL_STORAGE_KEY = 'save';
    var CLOCK_KEY = 'Saving';
    var AUTO_SAVE_INTERVAL = 0.1; // in minutes

    var Saving = function() {};

    Saving.prototype = {

        init: function() {
            this.turnOnAutoSave();
        },

        save: function() {
            var data = {};

            // Save all classes
            data.resourceEngine = Game.ResourceEngine.saveData();
            data.quests = Game.Quests.saveData();
            data.spellbook = Game.Spellbook.saveData();
            data.party = Game.PartyUI.saveData();
            data.town = Game.TownUI.saveData();
            // todo all the other classes

            // Bundle and save to localStorage
            data.savedAt = Date.now();
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
            console.log('Game saved at:', new Date());
        },

        load: function() {
            var data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

            if (data === null) {
                console.warn('No save file detected.');
                return;
            }

            // Load all classes
            Game.ResourceEngine.loadData(data.resourceEngine);
            Game.Quests.loadData(data.quests);
            Game.Spellbook.loadData(data.spellbook);
            Game.PartyUI.loadData(data.party);
            Game.TownUI.loadData(data.town);
            // todo all the other classes

            // Success message
            console.log('Game loaded. Last save was:', (data.savedAt ? new Date(data.savedAt) : '(Unknown)'));
        },

        clear: function() {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        },

        turnOnAutoSave: function() {
            var self = this;

            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                self.save();
            }, 60.0 * AUTO_SAVE_INTERVAL, true);
        },

        turnOffAutoSave: function() {
            Game.Clock.clearInterval(CLOCK_KEY);
        }

    };

    Game.Saving = new Saving();

}(jQuery));