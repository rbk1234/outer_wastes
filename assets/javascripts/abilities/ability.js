
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'Unknown',
        description: function() { return 'No description available.' },
        requiresTarget: false,
        onGlobalCooldown: true,
        events: {
            //'ability:castComplete': function(evt, target) {},
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
            this.$eventHandler = $(this);
            $.extend(true, this, DEFAULTS, Game.Abilities.Database[dbKey], config);
            Game.Util.initStats(this);
            Game.Util.initEvents(this);

            // Standard events
            this.$eventHandler.on('ability:castComplete', /**@this {Ability}*/ function(evt, target) {
                this.caster.consumeMana(this.manaCost.value());
                this._remainingCooldown = this.cooldown.value();
            });

            this._remainingCooldown = 0;
        },

        update: function(seconds) {
            this.reduceCooldown(seconds);
        },

        setCaster: function(caster) {
            this.caster = caster;
            this.$eventHandler.trigger('ability:learn');
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
                effectKey: this.dbKey,
                sourceAbility: this,
                sourceUnit: this.caster,
                icon: this.icon,
                background: this.background
            }, effectParams));

        }



    };

    Game.namespace('Abilities').Ability = Ability;

}(jQuery));
