
/*

 Note: Encounters don't have a corresponding database. Their data comes from the Room spawning it

 */


(function($) {
    'use strict';

    var DEFAULTS = {
        stats: {
            period: false,
            delay: 0 // how long to wait before starting period. can be negative to speed up first tick.
        },
        events: {
            //'encounter:periodicTick': function(evt) {},

            //'encounter:begin': function(evt) {},
            //'encounter:end': function(evt) {},
        },

        sourceRoom: null

    };

    var currentId = 1;

    var Encounter = function(config) {
        this._init(config);
    };
    Encounter.prototype = {

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

        // todo trigger encounter:begin, encounter:end

        _incrementPeriod: function(seconds) {
            this._periodLeft -= seconds;
            if (Game.Util.roundForComparison(this._periodLeft) <= 0) {
                $(this).trigger('encounter:periodicTick');

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

    Game.namespace('Rooms').Encounter = Encounter;

}(jQuery));
