
(function($) {
    'use strict';

    // state: locked -> unlocked -> accepted -> fulfilled -> completed

    var DEFAULTS = {
        name: 'Unnamed Quest',
        acceptDialog: 'No dialog available',
        fulfillDialog: 'No dialog available',
        completeDialog: 'No dialog available',
        state: 'unlocked', // default state is unlocked (use state:locked to prevent immediate accept)
        onUnlock: function() { /* do nothing */ },
        onAccept: function() { /* do nothing */ },
        onFulfill: function() { /* do nothing */ },
        onComplete: function() { /* do nothing */ },
    };

    var currentId = 1;


    var Quest = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Quest.prototype = {

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Quests.Database[dbKey], config);
            Game.Util.initStats(this);
        },

        canUnlock: function() {
            return this.state === 'locked';
        },
        canAccept: function() {
            return this.state === 'unlocked';
        },
        canFulfill: function() {
            return this.state === 'accepted';
        },
        canComplete: function() {
            return this.state === 'fulfilled';
        },
        hasBeenAccepted: function() {
            return this.canFulfill() || this.canComplete() || this.hasBeenCompleted();
        },
        hasBeenFulfilled: function() {
            return this.canComplete() || this.hasBeenCompleted();
        },
        hasBeenCompleted: function() {
            return this.state === 'completed';
        },

        unlock: function() {
            if (!this.canUnlock()) {
                console.error('Cannot unlock quest. Quest is: ', this.state);
                return;
            }
            else {
                console.log('Unlocked quest: ', this.dbKey);
            }

            this.state = 'unlocked';
            this.onUnlock();
        },

        accept: function() {
            if (!this.canAccept()) {
                console.error('Cannot accept quest. Quest is: ', this.state);
                return;
            }
            else {
                console.log('Accepted quest: ', this.dbKey);
            }

            this.state = 'accepted';
            this.onAccept();
        },

        fulfill: function() {
            if (!this.canFulfill()) {
                console.error('Cannot fulfill quest. Quest is: ', this.state);
                return;
            }
            else {
                console.log('Fulfilled quest: ', this.dbKey);
            }

            this.state = 'fulfilled';
            this.onFulfill();
        },

        complete: function() {
            if (!this.canComplete()) {
                console.error('Cannot complete quest. Quest is: ', this.state);
                return;
            }
            else {
                console.log('Completed quest: ', this.dbKey);
            }

            this.state = 'completed';
            this.onComplete();
        }
    };

    Game.namespace('Quests').Quest = Quest;

}(jQuery));
