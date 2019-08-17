/* Quests is a Singleton */

(function($) {
    'use strict';

    var ACCEPTED = 'accepted';
    var COMPLETED = 'completed';

    var Quests = function() {};

    Quests.prototype = {
        init: function() {
            var self = this;

            this._quests = {};
        },

        saveData: function() {
            return this._quests;
        },

        loadData: function(data) {
            var self = this;

            if (data === undefined) {
                return;
            }

            this._quests = data;
        },

        acceptQuest: function(dbKey) {
            if (this.isOnQuest(dbKey)) {
                console.error('Cannot accept quest. You are already on the quest: ', dbKey);
                return;
            }
            if (this.completedQuest(dbKey)) {
                console.error('Cannot accept quest. You have already completed the quest: ', dbKey);
                return;
            }

            var quest = new Game.Quests.Quest(dbKey);
            quest.accept();
            this._quests[dbKey] = ACCEPTED;
        },

        completeQuest: function(dbKey) {
            if (!this.isOnQuest(dbKey)) {
                console.error('Cannot complete quest. You have not begun the quest: ', dbKey);
                return;
            }

            var quest = new Game.Quests.Quest(dbKey);
            quest.complete();
            this._quests[dbKey] = COMPLETED;
        },

        canAcceptQuest: function(dbKey) {
            return this._quests[dbKey] === undefined;
        },

        isOnQuest: function(dbKey) {
            return this._quests[dbKey] === ACCEPTED;
        },

        completedQuest: function(dbKey) {
            return this._quests[dbKey] === COMPLETED;
        }
    };

    Game.Quests = new Quests();


}(jQuery));
