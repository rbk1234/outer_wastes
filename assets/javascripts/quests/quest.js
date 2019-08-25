
(function($) {
    'use strict';

    // state: locked -> unstarted -> started -> fulfilled -> completed

    var DEFAULTS = {
        name: 'Unnamed Quest',
        startDialog: 'No dialog available',
        fulfillDialog: 'No dialog available',
        completeDialog: 'No dialog available',
        state: 'unstarted', // default state is unstarted (use state:locked to prevent immediate start)
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
        canStart: function() {
            return this.state === 'unstarted';
        },
        canFulfill: function() {
            return this.state === 'started';
        },
        canComplete: function() {
            return this.state === 'fulfilled';
        },
        isCompleted: function() {
            return this.state === 'completed';
        },
        hasBeenStarted: function() {
            return this.canFulfill() || this.canComplete() || this.isCompleted();
        },

        unlock: function() {
            if (!this.canUnlock()) {
                console.error('Cannot unlock quest. Quest is: ', this.state);
                return;
            }
            else {
                console.log('Unlocked quest: ', this.dbKey);
            }

            this.state = 'unstarted';
            this.onUnlock();
        },

        start: function() {
            if (!this.canStart()) {
                console.error('Cannot accept quest. Quest is: ', this.state);
                return;
            }
            else {
                console.log('Started quest: ', this.dbKey);
            }

            this.state = 'started';
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
