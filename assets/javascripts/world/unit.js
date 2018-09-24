
(function($) {
    'use strict';

    var Unit = function(id, config) {
        this._init(id, config);
    };
    Unit.prototype = {

        _defaultConfig: {},

        _init: function(id, config) {
            this._config = $.extend({}, this._defaultConfig, config);

            this._dbRecord = Game.Database.Units[id];

            this._attackTimer = Math.random(); // remaining time until next attack. Initialize with random wait of <1s
            this._maxHealth = this._dbRecord.maxHealth;
            this._health = this.maxHealth();
            this._shield = this._dbRecord.initialShield || 0;

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

        shield: function() {
            return this._shield;
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
        addShield: function(amount) {
            if (Game.Util.round(amount) < 0) {
                console.warn('Cannot add a negative shield amount: use takeDamage function.');
                return;
            }
            this._shield += amount;
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

        incrementAttack: function(seconds, onAttack) {
            if (this.isDead()) {
                return;
            }

            if (Game.Util.round(this._attackTimer) <= 0) {
                onAttack();
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
            var shieldDamage = 0;
            var healthDamage = 0;
            if (this.isPlayer()) {
                console.log('taking damage... effective health: '+(this.shield() + this.health()));
            }

            if (Game.Util.round(this.shield()) > 0) {
                shieldDamage = Math.min(this.shield(), amount);
                this._shield -= shieldDamage;
                amount -= shieldDamage;
            }

            if (Game.Util.round(this.health()) > 0) {
                healthDamage = Math.min(this.health(), amount);
                this._health -= healthDamage;
                amount -= healthDamage;
            }

            //console.log('overkill: ' + amount);

            if (Game.Util.round(this.health()) <= 0) {
                this.kill();
            }
        },

        kill: function() {
            if (!this._isDead) {
                this._isDead = true;

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
