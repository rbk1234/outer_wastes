
(function($) {
    'use strict';

    var Room = function(id, config) {
        this._init(id, config);
    };
    Room.prototype = {

        _defaultConfig: {

        },

        _init: function(id, config) {
            this._dbRecord = $.extend(true, {}, Game.Rooms.Database[id]);

        }

    };

    Game.namespace('Rooms').Room = Room;

}(jQuery));
