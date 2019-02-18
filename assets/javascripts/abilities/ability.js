
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'Unknown',
        requiresTarget: false,
        events: {
            onCastComplete: function(caster, target) {
                // do nothing
            }
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

            this._cooldownRemaining = 0;
        },

        update: function(seconds) {
            this.reduceCooldown(seconds);
        },

        onCastComplete: function(caster, target) {
            this._cooldownRemaining = this.cooldown.value();
            this.events.onCastComplete(caster, target);
        },

        isReady: function() {
            return Game.Util.round(this._cooldownRemaining) <= 0;
        },

        reduceCooldown: function(seconds) {
            this._cooldownRemaining -= seconds;
            if (Game.Util.round(this._cooldownRemaining) <= 0) {
                this._cooldownRemaining = 0;
            }
        }



    };

    Game.namespace('Abilities').Ability = Ability;

}(jQuery));
