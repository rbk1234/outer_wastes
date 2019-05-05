
/*

 Note: AIs don't have a corresponding database. Their data comes from the Encounter spawning it

 */


(function($) {
    'use strict';

    var DEFAULTS = {
        stats: {
            period: false,
            delay: 0 // how long to wait before starting period. can be negative to speed up first tick.
        },
        events: {
            //'AI:periodicTick': function(evt) {},

            //'AI:begin': function(evt) {},
            //'AI:end': function(evt) {},
        },

        sourceEncounter: null

    };

    var currentId = 1;

    var AI = function(config) {
        this._init(config);
    };
    AI.prototype = {

        _init: function(config) {
            this.id = currentId++;
            $.extend(true, this, DEFAULTS, config);
            Game.Util.initStats(this);
            Game.Util.initEvents(this);

            // init internals:
            this._periodLeft = this.period.value();
            this._periodLeft += this.delay.value();
        },

        update: function(seconds) {
            if (this._hasPeriodicEffect()) {
                this._incrementPeriod(seconds);
            }
        },

        // todo trigger AI:begin, AI:end

        _incrementPeriod: function(seconds) {
            this._periodLeft -= seconds;
            if (Game.Util.roundForComparison(this._periodLeft) <= 0) {
                $(this).trigger('AI:periodicTick');

                // Add current _periodLeft to catch rollover
                this._periodLeft = this.period.value() + this._periodLeft;
            }
        },

        periodLeft: function() {
            return this._periodLeft;
        },

        _hasPeriodicEffect: function() {
            return !!this.period.value();
        },




    };

    Game.namespace('Encounters').AI = AI;

}(jQuery));
