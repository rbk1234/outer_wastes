
(function($) {
    'use strict';

    var DEFAULTS = {};

    var currentId = 1;

    var Level = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Level.prototype = {

        _defaultConfig: {

        },

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Levels.Database[dbKey], config);
            Game.Util.initStats(this);
        }


    };

    Game.namespace('Levels').Level = Level;

}(jQuery));
