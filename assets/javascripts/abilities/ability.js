
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'Unknown',
        description: 'No description available.',
        requiresTarget: false,
        onGlobalCooldown: true,
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

            this._remainingCooldown = 0;
        },

        update: function(seconds) {
            this.reduceCooldown(seconds);
        },

        onCastComplete: function(caster, target) {
            this._remainingCooldown = this.cooldown.value();
            this.events.onCastComplete(caster, target);
        },

        isReady: function() {
            return Game.Util.roundForComparison(this._remainingCooldown) <= 0;
        },

        remainingCooldown: function() {
            return this._remainingCooldown;
        },

        reduceCooldown: function(seconds) {
            this._remainingCooldown -= seconds;
            if (Game.Util.roundForComparison(this._remainingCooldown) <= 0) {
                this._remainingCooldown = 0;
            }
        }



    };

    Game.namespace('Abilities').Ability = Ability;

}(jQuery));
