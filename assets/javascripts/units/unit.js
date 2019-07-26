
(function($) {
    'use strict';

    var DEFAULTS = {
        teamId: null,
        animations: {
            width: 1, // how many frame spaces to occupy
            offset: 0 // how far of a left-indent
        },
        stats: {
            maxHealth: 1,
            manaRegen: null,
            attackSpeed: 1,
            attackDamage: 0,
            reward: 0,
            threat: 0.6, // takes 60% of the attacks coming to the unit; 50% are sent to units behind

            spellPower: 20
        },
        abilityKeys: []
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
            $.extend(true, this.animations, Game.Units.Animations[dbKey]);
            Game.Util.initStats(this);

            // init internals
            this.health = this.maxHealth.value();
            //this.mana = this.maxMana.value();
            this.mana = 0;

            this._attackTimer = 0;
            //this._attackTimer = Math.random() * 0.5; // remaining time until next attack. Initialize with random wait
            this._castAnimProgress = 0;

            this._effects = {};

            this._castProgress = null;
            this._abilities = {};
            this._equippedAbilityIds = Game.Util.createArray(Game.Constants.numPlayerAbilities, null);

            this._globalCooldown = null;

            this._isDead = false;

            this._initStartingAbilities();

            this.leaveCombat();
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
            //this.equippedAbilities().forEach(function(ability) {
            //    ability.update(seconds);
            //});
            if (this.id !== Game.Player.id && Game.UnitEngine.inCombat() && this.maxMana() && this.mana >= this.maxMana()) {
                this.castAbility(this.ability('special'), this.ability('special').autoTarget());
            }


            // auto attack
            this._incrementAttack(seconds);
            this._incrementCast(seconds);

            this._castAnimProgress += seconds;
        },

        _initStartingAbilities: function() {
            var self = this;
            var currentAbilitySlot = 0;
            this.abilityKeys.forEach(function(abilityKey) {
                var ability = new Game.Abilities.Ability(abilityKey);
                //if (self.id !== Game.Player.id) {
                //    ability.autocast = true;
                //}
                self.equipAbility('special', ability);
                currentAbilitySlot += 1;
            });
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
                Game.CombatUI.addEffect(this, effect);
                this._effects[effect.id] = effect;
            }

            this._checkForCombat(effect.sourceUnit);
        },

        refreshEffect: function(oldEffect, newEffect) {
            newEffect.inheritPeriodFrom(oldEffect); // inherit old tick rate

            // delete old effect, update UI accordingly
            delete this._effects[oldEffect.id];
            Game.CombatUI.refreshEffect(this, oldEffect, newEffect);

            // add new effect
            this._effects[newEffect.id] = newEffect;
        },

        removeEffect: function(effect) {
            // Only remove Effect if it still exists on the Unit. In rare cases an Effect might be removed
            // by two different actions in a single loop (e.g. target dies & effect expires same time).
            if (this._effects[effect.id]) {
                effect.removeFromUnit(this);
                delete this._effects[effect.id];
                Game.CombatUI.removeEffect(this, effect);
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

        isStunned: function() {
            return Object.values(this._effects).some(function(effect) {
                return effect.stunsTarget.value();
            });
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

            //if (healthSource.teamId === Game.Constants.teamIds.player) {
                Game.CombatUI.createFloatingText(this, healthSource, '+' + Game.Util.round(amount), 'heal');
            //}

            if (this.health >= this.maxHealth.value()) {
                this.health = this.maxHealth.value();
            }
        },
        addMana: function(amount) {
            if (this.isDead()) {
                return;
            }
            if (this.maxMana() === null) {
                return;
            }

            if (Game.Util.roundForComparison(amount) < 0) {
                console.warn('Cannot add a negative energy amount: use consumeMana function.');
                return;
            }
            this.mana += amount;
            if (this.mana >= this.maxMana()) {
                this.mana = this.maxMana();
            }
        },
        maxMana: function() {
            if (this.id === Game.Player.id) {
                return 300;
            }

            var specialAbility = this.ability('special');
            if (specialAbility) {
                return specialAbility.manaCost.value();
            }
            else {
                return null;
            }
        },

        totalAbsorb: function() {
            var amount = 0;
            Object.values(this._effects).forEach(function(effect) {
                amount += effect.absorbRemaining();
            });
            return amount;
        },

        takeDamage: function(amount, damageSource, css, delay) {
            css = Game.Util.defaultFor(css, 'white');

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

            //if (damageSource.id === Game.Player.id) {
            //    Game.CombatUI.createFloatingText(this, '' + Game.Util.round(amount), 'damage');
            //}
            if (damageSource.teamId === Game.Constants.teamIds.player) {
                Game.CombatUI.createFloatingText(this, damageSource, '' + Game.Util.round(amount), css, delay);
                //Game.CombatUI.createFloatingText(damageSource, damageSource, '' + Game.Util.round(amount), css, delay);
            }
            if (this.teamId === Game.Constants.teamIds.player) {
                Game.CombatUI.createFloatingText(this, damageSource, '-' + Game.Util.round(amount), 'red');
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
            if (this.attackSpeed.value() === 0) {
                return;
            }

            this._attackTimer -= seconds;
            if (Game.Util.roundForComparison(this._attackTimer) <= 0) {
                if (this.attack()) {
                    this._startAttackAnimation();
                    // attackSpeed is attacks per second. Add current _attackTimer to catch rollover
                    this._attackTimer = 1.0 / this.attackSpeed.value() + this._attackTimer;
                }
                else {
                    // was unable to attack. set timer to a small random offset
                    this._attackTimer = Math.random() * 0.3;
                }
            }
        },

        // returns true/false based on whether the attack was successful
        attack: function() {
            if (this.isStunned()) {
                return false;
            }

            var target = this.highestThreatTarget();

            if (target) {
                //console.log(this.name + ' attacked ' + target.name + ' for ' + this.attackDamage.value());
                target.takeDamage(this.attackDamage.value(), this);

                //this.addMana(10);

                return true;
            }

            return false;
        },

        percentHealth: function() {
            return Game.Util.roundForComparison(this.health / this.maxHealth.value()) * 100;
        },
        percentMana: function() {
            return Game.Util.roundForComparison(this.mana / this.maxMana()) * 100;
        },

        // ------------------------------------------------------------------ Abilities


        // @params key: 'basic', 'special', 'passive1', etc.
        ability: function(key) {
            return this._abilities[key];
        },
        equipAbility: function(key, ability) {
            this.unequipAbility(key);

            this._abilities[key] = ability;
            ability.equip(this);

            // todo update CombatUI
            if (this.id === Game.Player.id) {
                Game.CombatUI.equipAbility(ability, key);
            }
        },
        unequipAbility: function(key) {
            var ability = this.ability(key);
            if (ability) {
                ability.unequip();
                this._abilities[key] = null;

                // todo update CombatUI
                if (this.id === Game.Player.id) {
                    Game.CombatUI.unequipAbility(ability, key);
                }
            }
        },

        equippedAbilities: function(includeNulls) {
            var self = this;

            return Object.values(this._abilities);

            //var abilities = this._equippedAbilityIds.map(function(abilityId) {
            //    return self.ability(abilityId);
            //});
            //
            //if (includeNulls) {
            //    return abilities;
            //}
            //else {
            //    // filter out nulls/undefined
            //    return abilities.filter(function(ability) {
            //        return !!ability;
            //    });
            //}
        },




        // A Unit can have many Abilities
/*
        // -------- _abilities are all the Abilities a unit has access to (may or may not be equipped though)
        abilities: function() {
            return this._abilities;
        },
        ability: function(id) {
            return this._abilities[id];
        },
        gainAbility: function(ability) {
            ability.gain(this);
            this._abilities[ability.id] = ability;
        },
        loseAbility: function(ability) {
            ability.lose(this);
            delete this._abilities[ability.id];
        },
        hasAbility: function(ability) {
            return !!this.ability(ability.id);
        },

        // -------- equippedAbilities are Abilities the unit can actually cast

        // @param includeNulls: if true, "empty" ability slots will be left in the array result
        equippedAbilities: function(includeNulls) {
            var self = this;

            var abilities = this._equippedAbilityIds.map(function(abilityId) {
                return self.ability(abilityId);
            });

            if (includeNulls) {
                return abilities;
            }
            else {
                // filter out nulls/undefined
                return abilities.filter(function(ability) {
                    return !!ability;
                });
            }
        },
        equippedAbility: function(slot) {
            return this.abilities()[this._equippedAbilityIds[slot]];
        },
        equipAbility: function(ability, slot) {
            var self = this;

            if (!this.hasAbility(ability)) {
                console.error('Unit must gainAbility before it can equipAbility: ' + ability.name);
                return;
            }

            // unequip old ability
            this.unequipAbility(slot);

            // if unit already has the ability (in a diff slot) unequip it from that slot
            this.equippedAbilities(true).forEach(function(otherAbility, otherAbilitySlot) {
                if (otherAbility && otherAbility.id === ability.id) {
                    self.unequipAbility(otherAbilitySlot);
                }
            });

            // equip new ability
            this._equippedAbilityIds[slot] = ability.id;
            ability.equip(this);
            if (this.id === Game.Player.id) {
                Game.CombatUI.equipAbility(ability, slot);
            }
        },
        unequipAbility: function(slot) {
            var ability = this.equippedAbility(slot);
            if (ability) {
                ability.unequip();
                if (this.id === Game.Player.id) {
                    Game.CombatUI.unequipAbility(ability, slot);
                }
            }
            this._equippedAbilityIds[slot] = null;
        },

        abilityForDbKey: function(abilityDbKey) {
            var abilities = Object.values(this.abilities());
            for (var i = 0, len = abilities.length; i < len; i++) {
                if (abilities[i].dbKey === abilityDbKey) {
                    return abilities[i];
                }
            }
            return null;
        },
*/
        hasManaForAbility: function(ability) {
            return Game.Util.roundForComparison(this.mana) >= Game.Util.roundForComparison(ability.manaCost.value());
        },

        castAbility: function(ability, target) {
            //console.log('cast!', ability, target);
            //if (!this.hasAbility(ability)) {
            //    console.error('Unit ' + this.id + ' does not have ability ' + ability);
            //    return false;
            //}

            // If already casting something, return (TODO might need a latency window)
            if (this.isCasting()) {
                return false;
            }

            this._castAbility = ability;
            //if (!this._castAbility) {
            //    console.error('Unit ' + this.id + ' does not have ability ' + abilitySlot);
            //    return false;
            //}

            this._castTarget = target;

            if (this._hasCasterErrors() || this._hasCastTargetErrors() || this._hasManaError() || this._hasCooldownError()) {
                return false;
            }

            this._castTotal = this._castAbility.castTime.value(); // caching length of cast at start of cast (in case haste changes)

            if (this._castTotal === 0) {
                // Instant cast:
                this._castFinished();
            }
            else {
                // Has cast time; start progress
                this._castProgress = 0;
                //Game.CombatUI.startCastBar(this._castAbility.name, this._castTotal);
            }
            Game.CombatUI.startCast(this, this._castAbility);

            // start global cooldown
            if (this._castAbility.onGlobalCooldown) {
                this._globalCooldown = GLOBAL_COOLDOWN;
                this._updateAllAbilityCooldowns(); // propagate global cooldown to all abilities
            }

            return true;
        },

        cancelCast: function(message) {
            if (!this.isCasting()) {
                return;
            }

            this._castProgress = null;
            this._globalCooldown = null; // undo any global cooldown

            //Game.CombatUI.cancelCastBar(message);
            Game.CombatUI.cancelCast(this, this._castAbility, message);

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
            if (this.isStunned()) {
                Game.Util.toast('Cannot cast while stunned.');
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
                //Game.CombatUI.completeCastBar();
                Game.CombatUI.finishCast(this, this._castAbility);
            }
            this._updateAbilityCooldown(this._castAbility);

            this._startCastAnimation();
        },

        _updateAllAbilityCooldowns: function() {
            var self = this;

            this.equippedAbilities().forEach(function(ability) {
                self._updateAbilityCooldown(ability);
            });
        },

        // shows the ability cooling down in the UI
        _updateAbilityCooldown: function(ability) {
            if (this.id !== Game.Player.id) {
                return; // only need to do this for player
            }

            var totalCooldown, elapsed;

            if (!ability.onGlobalCooldown ||
                this._globalCooldown === null ||
                ability.remainingCooldown() > this._globalCooldown) {
                // show ability cooldown
                totalCooldown = ability.cooldown.value();
                elapsed = totalCooldown - ability.remainingCooldown();
                Game.CombatUI.startCooldown(ability, totalCooldown, elapsed);
            }
            else {
                // show global cooldown
                totalCooldown = GLOBAL_COOLDOWN;
                elapsed = totalCooldown - this._globalCooldown;
                Game.CombatUI.startCooldown(ability, totalCooldown, elapsed);
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

        enterCombat: function() {
            this.manaRegen.override = false;
        },
        leaveCombat: function() {
            this.manaRegen.override = 0;
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

                Game.CombatUI.unitDied(this);
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



        portrait: function() {
            return this.animations.portrait;
        },
        portraitFontSize: function() {
            return this.animations.portraitFontSize || 1.0;
        },
        image: function() {
            var timeIntoAnimation, image;//, cur, i, len;

            if (this.isDead()) {
                return this.animations.dead.image;
            }

            if (this._castAnimation && this.animations.cast) {
                timeIntoAnimation = this._castAnimProgress;
                image = this._imageForTime(this.animations.cast, timeIntoAnimation);
                if (image) {
                    return image;
                }
                this._endAnimations();
            }

            if (!Game.UnitEngine.inCombat()) {
                return this.animations.idle.image;
            }

            // Only show attack animation if _startAttackAnimation has been called. If the unit is cc'd, the _attackTimer
            // will be above 0 as the attack resets. We don't want to animate the unit attacking however.
            if (this._attackAnimation) {
                timeIntoAnimation = (1.0 / this.attackSpeed.value()) - this._attackTimer;
                image = this._imageForTime(this.animations.attack, timeIntoAnimation);
                if (image) {
                    return image;
                }
                this._endAnimations();
            }

            return this.animations.idle.image;
        },
        _imageForTime: function(animations, timeIntoAnimation) {
            var cur = 0;
            for (var i = 0, len = animations.length; i < len; i++) {
                cur += animations[i].duration;
                if (timeIntoAnimation < cur) {
                    return animations[i].image;
                }
            }
            return null;
        },
        imageOffset: function() {
            return this.animations.offset;
        },

        _startAttackAnimation: function() {
            if (!this._castAnimation) {
                this._attackAnimation = true;
            }
        },
        _endAnimations: function() {
            this._attackAnimation = false;
            this._castAnimation = false;
        },

        // Note: this is a "post"-cast animation (once the cast is done)
        // TODO some kind of animation DURING the cast (if has cast time)
        _startCastAnimation: function() {
            if (this.animations.cast) {
                this._endAnimations();
                this._castAnimation = true;
                this._castAnimProgress = 0;
            }
        },


    };

    Game.namespace('Units').Unit = Unit;

}(jQuery));
