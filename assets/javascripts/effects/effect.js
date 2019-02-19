
/*

    Note: Effects don't have a corresponding database. Their data comes from the Ability spawning it

 */


(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'unknown',
        stats: {
            duration: 5,
            period: false,
            absorbAmount: 0
        },
        events: {
            //onTick: function(affectedUnit, sourceUnit) {},

            //onReceiveDamage: function(affectedUnit, damageAmount, damageSource, sourceUnit) {
            //    // do nothing
            //},
            //
            //// TODO Use these for things like STR buffs
            //onGainEffect: function(affectedUnit, sourceUnit) {},
            //onLoseEffect: function(affectedUnit, sourceUnit) {}
        },

        affectedUnit: null,
        sourceUnit: null
    };

    var currentId = 1;

    var Effect = function(config) {
        this._init(config);
    };
    Effect.prototype = {

        _init: function(config) {
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, config);
            Game.Util.initStats(this);

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

        attachToUnit: function(unit) {
            this.affectedUnit = unit;
        },

        // inherit the existing period when refreshing an effect
        inheritPeriodFrom: function(effect) {
            this._periodLeft = effect.periodLeft();
        },

        _incrementPeriod: function(seconds) {
            this._periodLeft -= seconds;
            if (Game.Util.roundForComparison(this._periodLeft) <= 0) {
                this.events.onTick(this.affectedUnit, this.sourceUnit);

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
                    return 0;
                }
                else {
                    var overflow = Math.abs(this._absorbRemaining);
                    this._absorbRemaining = 0;
                    return overflow;
                }
            }
            else {
                return amount; // absorb nothing
            }
        }





    };

    Game.namespace('Effects').Effect = Effect;

}(jQuery));
