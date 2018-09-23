
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
            this._health = this._dbRecord.health;

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

        health: function() {
            return this._health;
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
            //var shouldAttack = false;
            if (Game.Util.round(this._attackTimer) <= 0) {
                //shouldAttack = true;
                onAttack();
                this._attackTimer = this.attackSpeed();
            }
            this._attackTimer -= seconds;
            //return shouldAttack;
        },

        attack: function(opponent) {
            if (opponent) {
                console.log(this.name() + ' attacked ' + opponent.name());
                opponent.takeDamage(this.attackDamage());
            }
        },

        takeDamage: function(amount) {
            this._health -= amount;

            if (Game.Util.round(this._health) <= 0) {
                this.kill();
            }
        },

        kill: function() {
            this._isDead = true;

            if (!this.isPlayer()) {
                // todo increment enemies killed counter
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
