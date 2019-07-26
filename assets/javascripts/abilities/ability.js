
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'Unknown',
        description: function() { return 'No description available.' },
        requiresTarget: false,
        autocast: false,
        allowedTargets: {
            /*
              How to read an ability's allowedTargets hash:

              An "ally: true" flag means this ability CAN be cast on allies. It does not mean the target HAS to be an ally.

              What really matters is when a flag is set to false. "ally: false" means you CANNOT cast this ability on allies.

              As an example, here are the four possible configurations for the ally/enemy flags:
                   1) ally: false, enemy: false    -> No acceptable targets
                   2) ally: true,  enemy: false    -> Can cast on allies, cannot cast on enemies
                   3) ally: false, enemy: true     -> Cannot cast on allies, can cast on enemies
                   4) ally: true,  enemy: true     -> Both allies and enemies are acceptable targets
             */
            ally: false, // Note: allies includes self by default. Use self: false to prevent it from being cast on self.
            enemy: false,

            living: true,
            dead: false,

            self: true
        },
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
            if (!Game.Abilities.Database[dbKey]) { // todo all db classes should have something like this
                console.error('Could not find ability in database: ', dbKey);
                return;
            }
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

        canTargetUnit: function(unit) {
            if (!this.requiresTarget) {
                return true; // If no target is required, ability can be cast regardless of target
            }
            if (!unit) {
                return false; // At this point, target is required. So if no unit, must be false
            }

            // Note: Each allowedTarget is handled individually on purpose. Refer to the description of allowedTargets.
            if (!this.allowedTargets.ally && this.caster.isAlliesWith(unit)) {
                return false;
            }
            if (!this.allowedTargets.enemy && this.caster.isEnemiesWith(unit)) {
                return false;
            }

            if (!this.allowedTargets.living && !unit.isDead()) {
                return false;
            }
            if (!this.allowedTargets.dead && unit.isDead()) {
                return false;
            }

            if (!this.allowedTargets.self && this.caster.id === unit.id) {
                return false;
            }

            // TODO     As you add more possible target restrictions, CombatUI will need to _refreshAbilityTargets()
            // TODO     when those restrictions can change. E.g. when rezzing is implemented, have to refresh on rez.

            return true;
        },

        //update: function(seconds) {
        //    this.reduceCooldown(seconds);
        //
        //    if (this.autocast && this.isReady()) {
        //        // todo not just cast on highest threat
        //        // todo debounce timer? incase cc'd
        //        var abilityCasted = this.caster.castAbility(this, this.caster.highestThreatTarget());
        //    }
        //},

        autoTarget: function() {
            switch (this.targetingAI) {
                case 'lowestHealthAlly':
                    return this._lowestHealthAlly();
                case 'highestThreatEnemy':
                    return Game.UnitEngine.highestThreatEnemy(this.caster);
                case 'highestHealthEnemy':
                    return this._highestHealthEnemy();
                case 'self':
                    return this.caster;
                default:
                    //console.warn('No targetingAI for ability: ', this);
                    return null;
            }
        },
        _highestHealthEnemy: function() {
            var target = null;
            this.caster.enemies().forEach(function(unit) {
                if (!unit.isDead() && (!target || unit.health > target.health)) {
                    target = unit;
                }
            });
            return target;
        },
        _lowestHealthAlly: function() {
            var target = null;
            this.caster.allies().forEach(function(unit) {
                if (!unit.isDead() && unit.percentHealth() < 100 &&
                    (!target || unit.percentHealth() < target.percentHealth())) {
                    target = unit;
                }
            });
            return target;
        },

        gain: function(caster) {
            this.caster = caster;
        },
        lose: function() {

        },

        equip: function(caster) {
            this.caster = caster;
            this.$eventHandler.trigger('ability:equip');
        },
        unequip: function() {
            this.$eventHandler.trigger('ability:unequip');
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
            return new Game.Effects.Effect($.extend(true, this.defaultEffectParams(), effectParams));
        },

        // When this ability spawns an Effect, use these defaults
        defaultEffectParams: function() {
            return {
                effectKey: this.dbKey,
                sourceAbility: this,
                sourceUnit: this.caster,
                icon: this.icon,
                background: this.background
            };
        }



    };

    Game.namespace('Abilities').Ability = Ability;

}(jQuery));
