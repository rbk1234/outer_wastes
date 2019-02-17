
(function($) {
    'use strict';

    var DEFAULTS = {
        name: 'unknown',
        period: false,
        onTick: function(unit) {
            // do nothing
        }
    };

    var currentId = 1;

    var Effect = function(dbKey, caster, target) {
        this._init(dbKey, caster, target);
    };
    Effect.prototype = {

        _init: function(dbKey, caster, target) {
            this.dbKey = dbKey;
            this.id = currentId++;

            //this._dbRecord = $.extend(true, {}, Game.Effects.Database[dbKey]);
            $.extend(true, this, DEFAULTS, Game.Effects.Database[dbKey]);

            // init internals:
            this._durationLeft = this.duration;
            this._periodLeft = this.period;

            this.caster = caster;
            this.target = target;

            //this._absorptionAmount = this.type() === 'absorption' ? this._dbRecord.amount : 0;
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
            if (Game.Util.round(this._periodLeft) <= 0) {
                this.onTick(this.target);

                // Add current _periodLeft to catch rollover
                this._periodLeft = this.period + this._periodLeft;
            }
        },

        durationLeft: function() {
            return this._durationLeft;
        },

        _hasPeriodicEffect: function() {
            return !!this.period;
        },

        isExpired: function() {
            // return true if expired, false if not expired
            if (Game.Util.round(this._durationLeft) <= 0) {
                return true;
            }
            //if (this.type() === 'absorption' && this.absorptionAmount() === 0) {
            //    return true;
            //}
            return false;
        },




        type: function() {
            return this._dbRecord.type;
        },


        absorptionAmount: function() {
            return this._absorptionAmount;
        },

        // returns amount of damage remaining
        absorbDamage: function(amount) {
            if (this.type() === 'absorption') {
                this._absorptionAmount -= amount;
                if (Game.Util.round(this._absorptionAmount) <= 0) {
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
