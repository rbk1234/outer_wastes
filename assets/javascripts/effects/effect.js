
/*

    Note: Effects don't have a corresponding database. Their data comes from the Ability spawning it

 */


(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'unknown',

        hasDuration: true,
        hidden: false, // whether is shows up in the UI

        stats: {
            duration: 0,
            period: false,
            absorbAmount: 0,

            maxStacks: 1
        },
        events: {
            //'effect:periodicTick': function(evt) {},

            // TODO Use these for things like STR buffs?
            //'effect:begin': function(evt) {},
            //'effect:end': function(evt) {},
        },

        effectKey: null, // normally the same as the Ability key, but sometimes has a custom value if Ability spawns multiple Effects
        sourceAbility: null,
        affectedUnit: null,
        sourceUnit: null,

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
            Game.Util.initEvents(this);

            // init internals:
            this._durationLeft = this.duration.value();
            this._periodLeft = this.period.value();
            this._absorbRemaining = this.absorbAmount.value();
        },

        update: function(seconds) {
            if (this.hasDuration) {
                this._durationLeft -= seconds;
            }

            if (this._hasPeriodicEffect()) {
                this._incrementPeriod(seconds);
            }
        },

        attachToUnit: function(unit) {
            this.affectedUnit = unit;
            $(this).trigger('effect:begin');
        },
        removeFromUnit: function(unit) {
            $(this).trigger('effect:end');
        },

        // inherit the existing period when refreshing an effect
        inheritPeriodFrom: function(effect) {
            this._periodLeft = effect.periodLeft();
        },

        _incrementPeriod: function(seconds) {
            this._periodLeft -= seconds;
            if (Game.Util.roundForComparison(this._periodLeft) <= 0) {
                $(this).trigger('effect:periodicTick');

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
            if (!this.hasDuration) {
                return false;
            }

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
