
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
            stunsTarget: false,

            maxStacks: 1
        },
        events: {
            //'effect:periodicTick': function(evt) {},

            // TODO Use these for things like STR buffs?
            //'effect:begin': function(evt) {},
            //'effect:end': function(evt) {},
        },
        animations: {
            color: 'white',
            offset: 0,
            frameLengths: null,
            frames: null
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
            $.extend(true, this.animations, Game.Effects.Animations[this.effectKey]);
            Game.Util.initStats(this);
            Game.Util.initEvents(this);

            // init internals:
            this._durationLeft = this.duration.value();
            this._periodLeft = this.period.value();
            this._absorbRemaining = this.absorbAmount.value();
            this._currentImageOffset = null;
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
        },

        image: function() {
            if (!this.animations.frames) {
                return null;
            }

            if (!this.animations.frameLengths) {
                return this.animations.frames[0];
            }

            var animationLength = this.animations.frameLengths.reduce(function(total, num) {
                return total + num;
            });
            var elapsedTime = this.duration.value() - this._durationLeft;

            // Count what animation loop we're on, so we can change the image offset if it is randomized
            var animationLoop = Math.floor(elapsedTime / animationLength);
            if (animationLoop !== this._lastAnimationLoop) {
                this._currentImageOffset = null;
            }
            this._lastAnimationLoop = animationLoop;

            var timeIntoAnimation = elapsedTime % animationLength;
            var cur = 0;
            for (var i = 0, l = this.animations.frameLengths.length; i < l; i++) {
                cur += this.animations.frameLengths[i];
                if (timeIntoAnimation < cur) {
                    return this.animations.frames[i];
                }
            }

            return null;
        },
        imageColor: function() {
            return this.animations.color;
        },
        imageOffset: function() {
            // If offset is an array, choose a random offset from within the array and keep that offset for the rest of the animation loop
            if ($.isArray(this.animations.offset)) {
                if (this._currentImageOffset === null) {
                    this._currentImageOffset = Game.Util.randomIntFromInterval(this.animations.offset[0], this.animations.offset[1]);
                }
                return this._currentImageOffset;
            }
            else {
                return this.animations.offset;
            }
        }



    };

    Game.namespace('Effects').Effect = Effect;

}(jQuery));
