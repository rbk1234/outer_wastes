
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'unknown',
        baseStats: {
            duration: 5,
            period: false,
            absorbAmount: 0
        },
        events: {
            onTick: function(target, effectSource) {
                // do nothing
            },

            //onReceiveDamage: function(target, damageAmount, damageSource, effectSource) {
            //    // do nothing
            //},
            //
            //// TODO Use these for things like STR buffs
            //onGainEffect: function(target, effectSource) {
            //
            //},
            //onLoseEffect: function(target, effectSource) {
            //
            //}
        },

        target: null, // gets assigned with Unit.addEffect
        effectSource: null
    };

    var currentId = 1;

    var Effect = function(dbKey, config) {
        this._init(dbKey, config);
    };
    Effect.prototype = {

        _init: function(dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, Game.Effects.Database[dbKey], config);
            Game.Util.initStats(this);

            // TODO Here is where haste calcs would go
            //this.period.multiplier -= 0.75; // get from this.effectSource

            // init internals:
            this._durationLeft = this.duration.value();
            this._periodLeft = this.period.value();
            this._absorbRemaining = this.absorbAmount.value();
        },

        update: function(seconds) {
            this._durationLeft -= seconds;

            if (this._hasPeriodicEffect()) {
                this._incrementPeriod(seconds);
            }
        },

        // inherit the existing period when refreshing an effect
        isRefreshingEffect: function(effect) {
            this._periodLeft = effect.periodLeft();
        },

        _incrementPeriod: function(seconds) {
            this._periodLeft -= seconds;
            if (Game.Util.roundForComparison(this._periodLeft) <= 0) {
                this.events.onTick(this.target, this.effectSource);

                // Add current _periodLeft to catch rollover
                this._periodLeft = this.period.value() + this._periodLeft;
            }
        },

        periodLeft: function() {
            return this._periodLeft;
        },

        durationLeft: function() {
            return this._durationLeft;
        },

        _hasPeriodicEffect: function() {
            return !!this.period.value();
        },

        isExpired: function() {
            // return true if expired, false if not expired
            if (Game.Util.roundForComparison(this._durationLeft) <= 0) {
                return true;
            }
            if (this._absorbsDamage() && !this._hasRemainingAbsorb()) {
                return true;
            }
            return false;
        },


        _absorbsDamage: function() {
            return !!this.absorbAmount.value();
        },
        _hasRemainingAbsorb: function() {
            return Game.Util.roundForComparison(this._absorbRemaining) > 0;
        },

        absorbRemaining: function() {
            return this._absorbRemaining;
        },

        // returns amount of damage remaining
        absorbDamage: function(amount) {
            if (this._absorbsDamage() && this._hasRemainingAbsorb()) {
                this._absorbRemaining -= amount;
                if (this._hasRemainingAbsorb()) {
                    console.log('full absorb');
                    return 0;
                }
                else {
                    var overflow = Math.abs(this._absorbRemaining);
                    this._absorbRemaining = 0;
                    console.log('overflow: '+overflow);
                    return overflow;
                }
            }
            else {
                console.log('no absorb');
                return amount; // absorb nothing
            }
        }





    };

    Game.namespace('Effects').Effect = Effect;

}(jQuery));
