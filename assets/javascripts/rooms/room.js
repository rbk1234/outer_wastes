
(function($) {
    'use strict';

    var DEFAULTS = {};

    var currentId = 1;

    var Room = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Room.prototype = {

        _defaultConfig: {

        },

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Rooms.Database[dbKey], config);
            Game.Util.initStats(this);

        }

    };

    Game.namespace('Rooms').Room = Room;

}(jQuery));
