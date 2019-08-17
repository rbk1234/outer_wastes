
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'Unnamed Quest',
        onAccept: function() { /* do nothing */ },
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

        accept: function() {

            this.onAccept();
        },

        complete: function() {

            this.onComplete();
        }
    };

    Game.namespace('Quests').Quest = Quest;

}(jQuery));
