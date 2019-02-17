
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'Unknown',
        requiresTarget: false,
        onCastComplete: function(caster, target) {
            // do nothing
        },
        baseStats: {
            manaCost: 20,
            cooldown: 0,
            castTime: 1
        }
    };

    var currentId = 1;

    var Ability = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Ability.prototype = {

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Abilities.Database[dbKey], config);
            Game.Util.initStats(this);
        },



        update: function(seconds) {
            // todo reduce cooldown
        }



    };

    Game.namespace('Abilities').Ability = Ability;

}(jQuery));
