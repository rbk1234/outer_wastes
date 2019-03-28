
(function($) {
    'use strict';

    var DEFAULTS = {};

    var currentId = 1;

    var Map = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Map.prototype = {

        _defaultConfig: {

        },

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Maps.Database[dbKey], config);
            Game.Util.initStats(this);

        },

    };

    Game.namespace('Maps').Map = Map;

}(jQuery));
