
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'unknown',
        baseStats: {
            duration: 5,
            period: false
        },
        events: {
            onTick: function(unit) {
                // do nothing
            }
        },

        target: null, // gets assigned with Unit.addEffect
        caster: null
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
            //this.period.multiplier -= 0.75; // get from this.caster

            // init internals:
            this._durationLeft = this.duration.value();
            this._periodLeft = this.period.value();
        },

        update: function(seconds) {
            this._durationLeft -= seconds;

            if (this._hasPeriodicEffect()) {
                this._incrementPeriod(seconds);
            }
        },

        // inherit the existing period when refreshing an effect
        isReplacingEffect: function(effect) {
            this._periodLeft = effect._periodLeft; // todo accessing private
        },

        _incrementPeriod: function(seconds) {
            this._periodLeft -= seconds;
            if (Game.Util.roundForComparison(this._periodLeft) <= 0) {
                this.events.onTick(this.target);

                // Add current _periodLeft to catch rollover
                this._periodLeft = this.period.value() + this._periodLeft;
            }
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
            //if (this.type() === 'absorption' && this.absorptionAmount() === 0) {
            //    return true;
            //}
            return false;
        },



        absorptionAmount: function() {
            return this._absorptionAmount;
        },

        // returns amount of damage remaining
        absorbDamage: function(amount) {
            if (this.type() === 'absorption') {
                this._absorptionAmount -= amount;
                if (Game.Util.roundForComparison(this._absorptionAmount) <= 0) {
                    var overflow = Math.abs(this._absorptionAmount);
                    this._absorptionAmount = 0;
                    return overflow;
                }
                else {
                    return 0;
                }
            }
        }





    };

    Game.namespace('Effects').Effect = Effect;

}(jQuery));
