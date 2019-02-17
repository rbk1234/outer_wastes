
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
            this._health = this.maxHealth.value();
            this._mana = this.maxMana.value();
            this._attackTimer = Math.random() * 0.2; // remaining time until next attack. Initialize with random wait

            this._effects = {};

            this._castProgress = null;
            this._abilities = {};

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
            if (Game.Util.round(amount) < 0) {
                console.warn('Cannot add a negative health amount: use takeDamage function.');
                return;
            }
            this._health += amount;
            if (this._health >= this.maxHealth.value()) {
                this._health = this.maxHealth.value();
            }
        },
        addMana: function(amount) {
            if (Game.Util.round(amount) < 0) {
                console.warn('Cannot add a negative energy amount: use consumeMana function.');
                return;
            }
            this._mana += amount;
            if (this._mana >= this.maxMana.value()) {
                this._mana = this.maxMana.value();
            }
        },
        takeDamage: function(amount) {
            // todo apply damage reductions (iterate thru effects, armor)

            // todo remove from the shield with least duration remaining first
            //if (Game.Util.round(this.shield()) > 0) {
            //    this._effects.forEach(function(effect) {
            //        amount = effect.absorbDamage(amount);
            //    });
            //}

            if (Game.Util.round(this._health) > 0) {
                this._health -= amount;
            }

            if (Game.Util.round(this._health) <= 0) {
                this.kill();
            }
        },
        consumeMana: function(amount) {
            this._mana -= amount;

            if (Game.Util.round(this._mana) <= 0) {
                this._mana = 0;
            }
        },

        highestThreatTarget: function() {
            console.error('Must be overridden');
        },

        _incrementAttack: function(seconds) {
            this._attackTimer -= seconds;
            if (Game.Util.round(this._attackTimer) <= 0) {
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

        addAbility: function(key) {
            this._abilities[key] = new Game.Abilities.Ability(key);
        },
        removeAbility: function(key) {
            delete this._abilities[key];
        },
        getAbility: function(key) {
            return this._abilities[key];
        },

        // TODO --- this is built around the player right now
        castAbility: function(key) {
            // If already casting something, return (TODO might need a latency window)
            if (this.isCasting()) {
                return;
            }

            // TODO Check if caster is dead

            this._castAbility = this.getAbility(key);
            this._castTarget = Game.UserInterface.targetedUnit();

            // If issues with target, return
            if (this._hasCastTargetErrors()) {
                return;
            }

            // TODO consumeMana

            this._castTotal = this._castAbility.castTime.value();//('castTime'); // caching castTime at start of cast (in case haste changes)
            this._castProgress = 0;

            // Only show cast bar if has a cast time
            if (this._castTotal !== 0) {
                Game.UserInterface.startCastBar(this._castAbility.name, this._castTotal);
            }
        },

        cancelCast: function(message) {
            if (!this.isCasting()) {
                return;
            }

            this._castProgress = null;
            Game.UserInterface.cancelCastBar(message);
        },

        isCasting: function() {
            return this._castProgress !== null;
        },

        _hasCastTargetErrors: function() {
            if (this._castAbility.requiresTarget) {
                if (this._castTarget === null) {
                    Game.Util.toast('Target is required');
                    return true;
                }
                if (this._castTarget.isDead()) {
                    Game.Util.toast('Target is dead');
                    return true;
                }
            }
            return false;
        },

        _incrementCast: function(seconds) {
            if (!this.isCasting()) {
                return;
            }

            this._castProgress += seconds;
            if (Game.Util.round(this._castProgress) >= this._castTotal) {
                // Check target again in case state changed (e.g. target died during cast)
                if (this._hasCastTargetErrors()) {
                    this.cancelCast('Failed');
                }
                else {
                    this._castAbility.onCastComplete(this, this._castTarget);
                    this._castProgress = null;
                    Game.UserInterface.completeCastBar();
                }
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
            if (!this._isDead) {
                this._isDead = true;
                this._health = 0;
                this.cancelCast();

                // todo remove all effects
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
        //    if (Game.Util.round(this._attackTimer) > (this.attackSpeed() - this._dbRecord.animations.attack.duration)) {
        //        return this._dbRecord.animations.attack.image;
        //    }
        //    else {
        //        return this._dbRecord.animations.idle.image;
        //    }
        //},



    };

    Game.namespace('Units').Unit = Unit;

}(jQuery));
