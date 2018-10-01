
(function($) {
    'use strict';

    var Effect = function(id) {
        this._init(id);
    };
    Effect.prototype = {

        _init: function(id) {
            this.id = id;

            this._dbRecord = $.extend(true, {}, Game.Database.Effects[id]);

            this._absorptionAmount = this.type() === 'absorption' ? this._dbRecord.amount : 0;
            this._durationLeft = this._dbRecord.duration;
        },

        type: function() {
            return this._dbRecord.type;
        },

        iconClass: function() {
            return this._dbRecord.iconClass;
        },

        update: function(seconds) {
            // reduce duration
            this._durationLeft -= seconds;
        },

        durationLeft: function() {
            return this._durationLeft;
        },

        isExpired: function() {
            if (Game.Util.round(this._durationLeft) <= 0) {
                return true;
            }
            if (this.type() === 'absorption' && this.absorptionAmount() === 0) {
                return true;
            }
            return false;
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

    Game.namespace('World').Effect = Effect;

}(jQuery));
