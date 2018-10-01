
(function($) {
    'use strict';

    var Unit = function(id, config) {
        this._init(id, config);
    };
    Unit.prototype = {

        _defaultConfig: {},

        _init: function(id, config) {
            this._config = $.extend({}, this._defaultConfig, config);

            this._dbRecord = $.extend(true, {}, Game.Database.Units[id]);

            this._attackTimer = Math.random(); // remaining time until next attack. Initialize with random wait of <1s
            this._maxHealth = this._dbRecord.maxHealth;
            this._health = this.maxHealth();
            this._maxEnergy = this._dbRecord.maxEnergy;
            this._energy = this.maxEnergy();
            this._energyRegen = this._dbRecord.energyRegen;

            this._effects = [];


            this._isDead = false;
        },

        image: function() {
            if (this.isDead()) {
                return this._dbRecord.animations.dead.image;
            }

            if (Game.Util.round(this._attackTimer) > (this.attackSpeed() - this._dbRecord.animations.attack.duration)) {
                return this._dbRecord.animations.attack.image;
            }
            else {
                return this._dbRecord.animations.idle.image;
            }
        },

        height: function() {
            return this._dbRecord.height;
        },

        name: function() {
            return this._dbRecord.name;
        },

        maxHealth: function() {
            return this._maxHealth;
        },
        health: function() {
            return this._health;
        },
        maxEnergy: function() {
            return this._maxEnergy;
        },
        energy: function() {
            return this._energy;
        },
        energyRegen: function() {
            return this._energyRegen; // regeneration is per second
        },

        shield: function() {
            var amount = 0;
            this._effects.forEach(function(effect) {
                amount += effect.absorptionAmount();
            });
            return amount;
        },

        ability: function(index) {
            return this._abilities[index];
        },

        // todo override this for player/unit
        castAbility: function(index) {
            var self = this;

            var ability = this.ability(index);

            if (ability) {
                // check if caster has enough energy
                if (ability.energyCost() && Game.Util.round(ability.energyCost()) > Game.Util.round(this.energy())) {
                    console.log('not enough energy!');
                    return;
                }

                // check if valid target

                // reduce caster energy by x
                this._energy -= ability.energyCost();

                // apply effects to caster
                if (ability.casterEffects()) {
                    ability.casterEffects().forEach(function(effectId) {
                        self.addEffect(new Game.World.Effect(effectId));
                    });
                }

                // create projectile

                // apply effects to target
            }
        },

        effects: function() {
            return this._effects;
        },

        addEffect: function(effect) {
            this._effects.push(effect);
        },

        addHealth: function(amount) {
            if (Game.Util.round(amount) < 0) {
                console.warn('Cannot add a negative health amount: use takeDamage function.');
                return;
            }
            this._health += amount;
            if (this._health >= this.maxHealth()) {
                this._health = this.maxHealth();
            }
        },
        addEnergy: function(amount) {
            if (Game.Util.round(amount) < 0) {
                console.warn('Cannot add a negative energy amount: use useEnergy function.');
                return;
            }
            this._energy += amount;
            if (this._energy >= this.maxEnergy()) {
                this._energy = this.maxEnergy();
            }
        },

        x: function(newX) {
            if (newX !== undefined) {
                this._x = newX;
            }
            return this._x;
        },

        // Cooldown between attacks. An attackSpeed of 0.25 means 4 attacks per second
        attackSpeed: function() {
            return this._dbRecord.attackSpeed;
        },

        attackDamage: function() {
            return this._dbRecord.attackDamage;
        },

        update: function(seconds, nearestTarget) {
            if (this.isDead()) {
                return;
            }

            // Regenerate health/energy/cooldowns
            this.addEnergy(this.energyRegen() * seconds);

            // update effects
            this._effects.forEach(function(effect) {
                effect.update(seconds);
            });

            // remove expired effects
            for (var i = this._effects.length - 1; i >= 0; i--) {
                if (this._effects[i].isExpired()) {
                    this._effects.splice(i, 1);
                }
            }

            // auto attack
            this._incrementAttack(seconds, nearestTarget)
        },

        _incrementAttack: function(seconds, nearestTarget) {
            if (Game.Util.round(this._attackTimer) <= 0) {
                this.attack(nearestTarget);
                this._attackTimer = this.attackSpeed();
            }
            this._attackTimer -= seconds;
        },

        attack: function(opponent) {
            if (opponent) {
                //console.log(this.name() + ' attacked ' + opponent.name());
                opponent.takeDamage(this.attackDamage());
            }
        },

        takeDamage: function(amount) {
            if (this.isPlayer()) {
                //console.log('taking damage... effective health: '+(this.shield() + this.health()));
            }

            // todo apply damage reductions (iterate thru effects, armor)

            // todo remove from the shield with least duration remaining first
            if (Game.Util.round(this.shield()) > 0) {
                this._effects.forEach(function(effect) {
                    amount = effect.absorbDamage(amount);
                });
            }

            if (Game.Util.round(this.health()) > 0) {
                this._health -= amount;
            }

            if (Game.Util.round(this.health()) <= 0) {
                this.kill();
            }
        },
        useEnergy: function(amount) {
            this._energy -= amount;
        },

        kill: function() {
            if (!this._isDead) {
                this._isDead = true;
                this._health = 0;

                if (!this.isPlayer()) {
                    // todo increment enemies killed counter
                }
            }
        },

        isDead: function() {
            return this._isDead;
        },

        isPlayer: function() {
            return false;
        }


    };

    Game.namespace('World').Unit = Unit;

}(jQuery));
