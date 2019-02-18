
(function($) {
    'use strict';

    var DEFAULTS = {
        baseStats: {
            maxHealth: 1,
            maxMana: 1,
            manaRegen: 1,
            attackSpeed: 1,
            attackDamage: 0,
            reward: 0
        }
    };

    var GLOBAL_COOLDOWN = 1;

    var currentId = 1;

    var Unit = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Unit.prototype = {

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Units.Database[dbKey], config);
            Game.Util.initStats(this);

            // init internals
            this.health = this.maxHealth.value();
            this.mana = this.maxMana.value();
            this._attackTimer = Math.random() * 0.2; // remaining time until next attack. Initialize with random wait

            this._effects = {};

            this._castProgress = null;
            this._abilities = {};

            this._globalCooldown = null;

            this._isDead = false;
        },

        update: function(seconds) {
            var self = this;

            if (this.isDead()) {
                return;
            }

            // Regenerate health/energy/cooldowns
            this.addMana(this.manaRegen.value() * seconds);

            // update effects, remove effect if expired
            Game.Util.iterateObject(this._effects, function(id, effect) {
                effect.update(seconds);
                if (effect.isExpired()) {
                    self.removeEffect(effect);
                }
            });

            if (this._globalCooldown !== null) {
                this._globalCooldown -= seconds;
                if (Game.Util.roundForComparison(this._globalCooldown) <= 0) {
                    this._globalCooldown = null;
                }
            }

            // update abilities
            Game.Util.iterateObject(this._abilities, function(id, ability) {
                ability.update(seconds);
            });

            // auto attack
            this._incrementAttack(seconds);
            this._incrementCast(seconds);
        },


        effects: function() {
            return this._effects;
        },

        castEffectOnTarget: function(effectDbKey, target) {
            var effect = new Game.Effects.Effect(effectDbKey, {
                caster: this
            });
            target.addEffect(effect);
        },

        addEffect: function(effect) {
            effect.target = this;

            var existingEffect = this.existingEffect(effect.dbKey, effect.caster);
            if (existingEffect) {
                effect.isReplacingEffect(existingEffect);
                this.removeEffect(existingEffect);
            }

            Game.UserInterface.addEffect(this, effect);
            this._effects[effect.id] = effect;
        },

        removeEffect: function(effect) {
            Game.UserInterface.removeEffect(this, effect);
            delete this._effects[effect.id];
        },

        // if a caster already has casted an effect on this unit, return that effect
        // This is used to ensure you can't stack an effect multiple times on a unit
        existingEffect: function(effectDbKey, caster) {
            var matchingEffect = null;
            Game.Util.iterateObject(this._effects, function(effectId, effect) {
                if (effect.dbKey = effectDbKey && effect.caster && effect.caster.id === caster.id) {
                    matchingEffect = effect;
                }
            });
            return matchingEffect;
        },


        addHealth: function(amount) {
            if (Game.Util.roundForComparison(amount) < 0) {
                console.warn('Cannot add a negative health amount: use takeDamage function.');
                return;
            }
            this.health += amount;
            if (this.health >= this.maxHealth.value()) {
                this.health = this.maxHealth.value();
            }
        },
        addMana: function(amount) {
            if (Game.Util.roundForComparison(amount) < 0) {
                console.warn('Cannot add a negative energy amount: use consumeMana function.');
                return;
            }
            this.mana += amount;
            if (this.mana >= this.maxMana.value()) {
                this.mana = this.maxMana.value();
            }
        },
        takeDamage: function(amount) {
            // todo apply damage reductions (iterate thru effects, armor)

            // todo remove from the shield with least duration remaining first
            //if (Game.Util.roundForComparison(this.shield()) > 0) {
            //    this._effects.forEach(function(effect) {
            //        amount = effect.absorbDamage(amount);
            //    });
            //}

            if (Game.Util.roundForComparison(this.health) > 0) {
                this.health -= amount;
            }

            if (Game.Util.roundForComparison(this.health) <= 0) {
                this.kill();
            }
        },
        hasEnoughMana: function(amount) {
            return Game.Util.roundForComparison(this.mana) >= amount;
        },
        consumeMana: function(amount) {
            this.mana -= amount;

            if (Game.Util.roundForComparison(this.mana) <= 0) {
                this.mana = 0;
            }
        },

        highestThreatTarget: function() {
            console.error('Must be overridden');
        },

        _incrementAttack: function(seconds) {
            this._attackTimer -= seconds;
            if (Game.Util.roundForComparison(this._attackTimer) <= 0) {
                this.attack();

                // attackSpeed is attacks per second. Add current _attackTimer to catch rollover
                this._attackTimer = 1.0 / this.attackSpeed.value() + this._attackTimer;
            }
        },

        attack: function() {
            var target = this.highestThreatTarget();

            if (target) {
                //console.log(this.name + ' attacked ' + target.name + ' for ' + this.attackDamage.value());
                target.takeDamage(this.attackDamage.value());
            }
        },

        // ------------------------------------------------------------------ Abilities
        // A Unit can have many Abilities

        addAbility: function(ability) {
            this._abilities[ability.id] = ability;
        },
        getAbility: function(abilityId) {
            return this._abilities[abilityId];
        },

        // TODO --- this is built around the player right now
        castAbility: function(abilityId) {
            // If already casting something, return (TODO might need a latency window)
            if (this.isCasting()) {
                return;
            }

            this._castAbility = this.getAbility(abilityId);
            if (!this._castAbility) {
                console.error('Unit ' + this.id + ' does not have ability ' + abilityId);
                return;
            }

            this._castTarget = Game.UserInterface.targetedUnit();

            // todo check caster errors (e.g. if caster is dead)
            if (this._hasCastTargetErrors() || this._hasManaError() || this._hasCooldownError()) {
                return;
            }

            this._castTotal = this._castAbility.castTime.value(); // caching castTime at start of cast (in case haste changes)

            if (this._castTotal === 0) {
                // Instant cast:
                this._castFinished();
            }
            else {
                // Has cast time; start progress
                this._castProgress = 0;
                Game.UserInterface.startCastBar(this._castAbility.name, this._castTotal);
            }

            // start global cooldown
            if (this._castAbility.onGlobalCooldown) {
                this._globalCooldown = GLOBAL_COOLDOWN;
                this._updateAllAbilityCooldowns(); // propagate global cooldown to all abilities
            }
        },

        cancelCast: function(message) {
            if (!this.isCasting()) {
                return;
            }

            this._castProgress = null;
            this._globalCooldown = null; // undo any global cooldown

            Game.UserInterface.cancelCastBar(message);

            this._updateAllAbilityCooldowns(); // since global cd was undone, have to sync ability cooldowns
        },

        isCasting: function() {
            return this._castProgress !== null;
        },

        _hasCastTargetErrors: function() {
            if (this._castAbility.requiresTarget) {
                if (this._castTarget === null) {
                    Game.Util.toast('Target is required.');
                    return true;
                }
                if (this._castTarget.isDead()) {
                    Game.Util.toast('Target is dead.');
                    return true;
                }
            }
            return false;
        },
        _hasManaError: function() {
            if (this.hasEnoughMana(this._castAbility.manaCost.value())) {
                return false;
            }
            else {
                Game.Util.toast('Not enough mana.');
                return true;
            }
        },
        _hasCooldownError: function() {
            if (this._castAbility.onGlobalCooldown && this._globalCooldown !== null) {
                Game.Util.toast('Ability not ready yet (GCD).');
                return true;
            }
            if (!this._castAbility.isReady()) {
                Game.Util.toast('Ability not ready yet.');
                return true;
            }
            return false;
        },

        _incrementCast: function(seconds) {
            if (!this.isCasting()) {
                return;
            }

            this._castProgress += seconds;
            if (Game.Util.roundForComparison(this._castProgress) >= this._castTotal) {
                // Check errors again in case state changed (e.g. target died during cast)
                // Note: Not checking cooldown errors: short casts may be faster than GCD
                if (this._hasCastTargetErrors() || this._hasManaError()) {
                    this.cancelCast('Failed');
                    return;
                }

                this._castFinished();
            }
        },

        _castFinished: function() {
            this.consumeMana(this._castAbility.manaCost.value());
            this._castAbility.onCastComplete(this, this._castTarget);
            if (this._castProgress !== null) {
                this._castProgress = null;
                Game.UserInterface.completeCastBar();
            }
            this._updateAbilityCooldown(this._castAbility);
        },

        _updateAllAbilityCooldowns: function() {
            var self = this;

            Game.Util.iterateObject(this._abilities, function(key, ability) {
                self._updateAbilityCooldown(ability);
            });
        },

        // shows the ability cooling down in the UI
        _updateAbilityCooldown: function(ability) {
            var totalCooldown, elapsed;

            if (this._globalCooldown === null || ability.remainingCooldown() > this._globalCooldown) {
                // show ability cooldown
                totalCooldown = ability.cooldown.value();
                elapsed = totalCooldown - ability.remainingCooldown();
                Game.UserInterface.startCooldown(ability, totalCooldown, elapsed);
            }
            else {
                // show global cooldown
                totalCooldown = GLOBAL_COOLDOWN;
                elapsed = totalCooldown - this._globalCooldown;
                Game.UserInterface.startCooldown(ability, totalCooldown, elapsed);
            }
        },




        //shield: function() {
        //    var amount = 0;
        //    this._effects.forEach(function(effect) {
        //        amount += effect.absorptionAmount();
        //    });
        //    return amount;
        //},



        kill: function() {
            var self = this;

            if (!this._isDead) {
                this._isDead = true;
                this.health = 0;
                this.cancelCast();

                // remove all effects
                Game.Util.iterateObject(this._effects, function(id, effect) {
                    self.removeEffect(effect);
                });
            }
        },

        isDead: function() {
            return this._isDead;
        },

        isAlly: function() {
            return false;
        },
        isEnemy: function() {
            return false;
        },


        //image: function() {
        //    if (this.isDead()) {
        //        return this._dbRecord.animations.dead.image;
        //    }
        //
        //    if (Game.Util.roundForComparison(this._attackTimer) > (this.attackSpeed() - this._dbRecord.animations.attack.duration)) {
        //        return this._dbRecord.animations.attack.image;
        //    }
        //    else {
        //        return this._dbRecord.animations.idle.image;
        //    }
        //},



    };

    Game.namespace('Units').Unit = Unit;

}(jQuery));
