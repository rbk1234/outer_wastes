
(function($) {
    'use strict';

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

            this._dbRecord = $.extend(true, {}, Game.Rooms.Database[dbKey]);

        }

    };

    Game.namespace('Rooms').Room = Room;

}(jQuery));
