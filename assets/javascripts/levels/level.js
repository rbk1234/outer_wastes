
(function($) {
    'use strict';

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

            this._dbRecord = $.extend(true, {}, Game.Levels.Database[dbKey]);
        },


    };

    Game.namespace('Levels').Level = Level;

}(jQuery));
