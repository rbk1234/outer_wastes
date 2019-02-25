
(function($) {
    'use strict';

    var DEFAULTS = {
        teamId: null,
        stats: {
            maxHealth: 1,
            maxMana: 1,
            manaRegen: 1,
            attackSpeed: 1,
            attackDamage: 0,
            reward: 0,

            spellPower: 20
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
            this._attackTimer = Math.random() * 0.5; // remaining time until next attack. Initialize with random wait

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
                if (!effect) {
                    return; // The effect may have been deleted while iterating (e.g. unit died from previous effect)
                }

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

        addEffect: function(effect) {
            effect.attachToUnit(this);

            var existingEffect = this.existingEffect(effect);
            if (existingEffect) {
                this.refreshEffect(existingEffect, effect);
            }
            else {
                // add new effect
                Game.UserInterface.addEffect(this, effect);
                this._effects[effect.id] = effect;
            }

            this._checkForCombat(effect.sourceUnit);
        },

        refreshEffect: function(oldEffect, newEffect) {
            newEffect.inheritPeriodFrom(oldEffect); // inherit old tick rate

            // delete old effect, update UI accordingly
            delete this._effects[oldEffect.id];
            Game.UserInterface.refreshEffect(this, oldEffect, newEffect);

            // add new effect
            this._effects[newEffect.id] = newEffect;
        },

        removeEffect: function(effect) {
            // Only remove Effect if it still exists on the Unit. In rare cases an Effect might be removed
            // by two different actions in a single loop (e.g. target dies & effect expires same time).
            if (this._effects[effect.id]) {
                effect.removeFromUnit(this);
                delete this._effects[effect.id];
                Game.UserInterface.removeEffect(this, effect);
            }
        },

        // if a caster already has casted an effect on this unit, return that effect
        // This is used to ensure you can't stack an effect multiple times on a unit
        existingEffect: function(newEffect) {
            var matchingEffects = this.existingEffects(newEffect);

            if (newEffect.maxStacks.value() > 1) {
                if (matchingEffects.length < newEffect.maxStacks.value()) {
                    return false; // still have room
                }
                else {
                    // find one with shortest duration
                    var shortestDurationEffect = null;
                    matchingEffects.forEach(function(effect) {
                        if (!shortestDurationEffect || effect.durationLeft() < shortestDurationEffect.durationLeft()) {
                            shortestDurationEffect = effect;
                        }
                    });
                    return shortestDurationEffect;
                }
            }
            else {
                return matchingEffects[0];
            }
        },
        existingEffects: function(effect) {
            var matchingEffects = [];

            Game.Util.iterateObject(this._effects, function(existingEffectId, existingEffect) {
                if (existingEffect.sourceAbility.id === effect.sourceAbility.id &&
                    existingEffect.effectKey === effect.effectKey) {
                    matchingEffects.push(existingEffect);
                }
            });

            return matchingEffects;
        },


        addHealth: function(amount, healthSource) {
            if (this.isDead()) {
                return;
            }

            if (Game.Util.roundForComparison(amount) < 0) {
                console.warn('Cannot add a negative health amount: use takeDamage function.');
                return;
            }
            this.health += amount;

            if (healthSource.id === Game.Player.id) {
                Game.UserInterface.createFloatingText(this, '+' + Game.Util.round(amount), 'heal');
            }

            if (this.health >= this.maxHealth.value()) {
                this.health = this.maxHealth.value();
            }
        },
        addMana: function(amount) {
            if (this.isDead()) {
                return;
            }

            if (Game.Util.roundForComparison(amount) < 0) {
                console.warn('Cannot add a negative energy amount: use consumeMana function.');
                return;
            }
            this.mana += amount;
            if (this.mana >= this.maxMana.value()) {
                this.mana = this.maxMana.value();
            }
        },

        totalAbsorb: function() {
            var amount = 0;
            Object.values(this._effects).forEach(function(effect) {
                amount += effect.absorbRemaining();
            });
            return amount;
        },

        takeDamage: function(amount, damageSource) {
            if (this.isDead()) {
                return;
            }

            this._checkForCombat(damageSource);

            // todo apply damage reductions (iterate thru effects, armor)

            // Sort effects by duration (take shield from shortest duration first)
            // TODO Does this sorting actually work?
            var sortedEffects = Object.values(this._effects).sort(function(a, b) {
                return a.durationLeft() - b.durationLeft();
            });
            sortedEffects.forEach(function(effect) {
                amount = effect.absorbDamage(amount);
            });

            if (damageSource.id === Game.Player.id) {
                Game.UserInterface.createFloatingText(this, '' + Game.Util.round(amount), 'damage');
            }

            if (Game.Util.roundForComparison(this.health) > 0) {
                this.health -= amount;
            }

            if (Game.Util.roundForComparison(this.health) <= 0) {
                this.kill();
            }
        },
        consumeMana: function(amount) {
            if (this.isDead()) {
                return;
            }

            this.mana -= amount;

            if (Game.Util.roundForComparison(this.mana) <= 0) {
                this.mana = 0;
            }
        },

        highestThreatTarget: function() {
            return Game.UnitEngine.highestThreatEnemy(this);
        },

        // Note: Includes self
        allies: function() {
            return Game.UnitEngine.unitsForTeam(this.teamId);
        },

        enemies: function() {
            return Game.UnitEngine.unitsForTeam(Game.UnitEngine.opposingTeamId(this.teamId));
        },

        isAlliesWith: function(unit) {
            return unit.teamId === this.teamId;
        },

        isEnemiesWith: function(unit) {
            return unit.teamId === Game.UnitEngine.opposingTeamId(this.teamId);
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
                target.takeDamage(this.attackDamage.value(), this);
            }
        },

        percentHealth: function() {
            return Game.Util.roundForComparison(this.health / this.maxHealth.value()) * 100
        },

        // ------------------------------------------------------------------ Abilities
        // A Unit can have many Abilities

        abilities: function() {
            return this._abilities;
        },
        addAbility: function(ability) {
            ability.setCaster(this);
            this._abilities[ability.id] = ability;
        },
        abilityForDbKey: function(abilityDbKey) {
            var matchingAbility = null;
            Game.Util.iterateObject(this._abilities, function(abilityId, ability) {
                if (ability.dbKey === abilityDbKey) {
                    matchingAbility = ability;
                }
            });
            return matchingAbility;
        },

        hasManaForAbility: function(ability) {
            return Game.Util.roundForComparison(this.mana) >= Game.Util.roundForComparison(ability.manaCost.value());
        },

        // TODO --- this is built around the player right now
        castAbility: function(abilityId, target) {
            // If already casting something, return (TODO might need a latency window)
            if (this.isCasting()) {
                return;
            }

            this._castAbility = this.abilities()[abilityId];
            if (!this._castAbility) {
                console.error('Unit ' + this.id + ' does not have ability ' + abilityId);
                return;
            }

            this._castTarget = target;

            if (this._hasCasterErrors() || this._hasCastTargetErrors() || this._hasManaError() || this._hasCooldownError()) {
                return;
            }

            this._castTotal = this._castAbility.castTime.value(); // caching length of cast at start of cast (in case haste changes)

            if (this._castTotal === 0) {
                // Instant cast:
                this._castFinished();
            }
            else {
                // Has cast time; start progress
                this._castProgress = 0;
                //Game.UserInterface.startCastBar(this._castAbility.name, this._castTotal);
            }
            Game.UserInterface.startCast(this._castAbility);

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

            //Game.UserInterface.cancelCastBar(message);
            Game.UserInterface.cancelCast(this._castAbility, message);

            this._updateAllAbilityCooldowns(); // since global cd was undone, have to sync ability cooldowns
        },

        isCasting: function(ability) {
            return this._castProgress !== null;
        },

        _hasCasterErrors: function() {
            if (this.isDead()) {
                Game.Util.toast('Cannot cast while dead.');
                return true;
            }
            return false;
        },

        _hasCastTargetErrors: function() {
            if (this._castAbility.canTargetUnit(this._castTarget)) {
                return false;
            }
            else {
                Game.Util.toast('Invalid target.');
                return true;
            }
        },
        _hasManaError: function() {
            if (this.hasManaForAbility(this._castAbility)) {
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
                if (this._hasCasterErrors() || this._hasCastTargetErrors() || this._hasManaError()) {
                    this.cancelCast('Failed');
                    return;
                }

                this._castFinished();
            }
        },

        _castFinished: function() {
            $(this._castAbility).trigger('ability:castComplete', this._castTarget);
            $(this).trigger('unit:castComplete', [this._castAbility, this._castTarget]);

            if (this._castProgress !== null) {
                this._castProgress = null;
                //Game.UserInterface.completeCastBar();
                Game.UserInterface.finishCast(this._castAbility);
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

            if (!ability.onGlobalCooldown ||
                this._globalCooldown === null ||
                ability.remainingCooldown() > this._globalCooldown) {
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





        // Check for start of combat
        _checkForCombat: function(source) {
            if (!Game.UnitEngine.inCombat()) {
                if (this.teamId === Game.Constants.teamIds.computer && this.isEnemiesWith(source)) {
                    Game.UnitEngine.enterCombat();
                }
            }
        },




        kill: function() {
            var self = this;

            if (!this._isDead) {
                this.health = 0;

                $(this).trigger('unit:beforeDeath');

                if (this._preventNextDeath) {
                    this._preventNextDeath = false;
                    return;
                }

                this._isDead = true;
                this.cancelCast();

                // remove all effects
                Game.Util.iterateObject(this._effects, function(id, effect) {
                    self.removeEffect(effect);
                });

                Game.UserInterface.unitDied(this);
            }
        },

        // Note: If you preventNextDeath, health will still be 0, so have to immediately heal unit
        preventNextDeath: function() {
            if (!this._isDead) {
                this._preventNextDeath = true;
            }
        },

        isDead: function() {
            return this._isDead;
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
