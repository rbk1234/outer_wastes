/* Quests is a Singleton */

(function($) {
    'use strict';

    var Quests = function() {};

    Quests.prototype = {
        init: function() {
            this._quests = {}; // dbKey -> Quest object
        },

        saveData: function() {
            var data = {};

            Game.Util.iterateObject(this._quests, function(dbKey, quest) {
                data[dbKey] = quest.state;
            });

            return data;
        },

        loadData: function(data) {
            var self = this;

            if (data === undefined) {
                return;
            }

            Game.Util.iterateObject(data, function(dbKey, state) {
                self.quest(dbKey).state = state;
            });
        },

        quest: function(dbKey) {
            if (!this._quests[dbKey]) {
                this._quests[dbKey] = new Game.Quests.Quest(dbKey);
            }

            return this._quests[dbKey];
        },

    };

    Game.Quests = new Quests();


}(jQuery));
