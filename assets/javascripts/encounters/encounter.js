
(function($) {
    'use strict';

    var DEFAULTS = {};

    var currentId = 1;

    var Encounter = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Encounter.prototype = {

        _defaultConfig: {

        },

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Encounters.Database[dbKey], config);
            Game.Util.initStats(this);
            Game.Util.initEvents(this);
        },

        load: function() {
            Game.UserInterface.newEncounterLoaded(this);
        }

    };

    Game.namespace('Encounters').Encounter = Encounter;

}(jQuery));
