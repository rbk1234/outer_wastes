
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'Unknown',
        description: function() { return 'No description available.' },
        requiresTarget: false,
        onGlobalCooldown: true,
        events: {
            onCastComplete: function(target) {
                // do nothing
            }
        },
        stats: {
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

        setCaster: function(caster) {
            this.caster = caster;
        },

        onCastComplete: function(target) {
            this._remainingCooldown = this.cooldown.value();
            Game.Util.makeCallback(this, this.events.onCastComplete)(target);
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
        },

        // Creates an Effect with the same icon/background as this Ability. Also sets sourceAbility/sourceUnit.
        createEffect: function(effectParams) {
            return new Game.Effects.Effect($.extend(true, {
                sourceAbility: this,
                sourceUnit: this.caster,
                icon: this.icon,
                background: this.background
            }, effectParams));

        }



    };

    Game.namespace('Abilities').Ability = Ability;

}(jQuery));
