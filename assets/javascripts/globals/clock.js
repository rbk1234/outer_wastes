/* Handles Game time. Register all periodic functions with Clock.setInterval
*  Do not use window.setInterval, since that will be paused while browser tab is in the background
*  Do not use window.setTimeout, use the Timer class below.
* */
/* Singleton */

(function ($) {
    'use strict';

    var Clock = function() {};

    Clock.prototype = {

        init: function() {
            /*. Fallback support, window.requestAnimationFrame isn't fully supported by all browsers .*/
            window.requestFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    function (c) {
                        window.setTimeout(c, 50);
                    };
            })();

            /*. Time based variables, all in milliseconds .*/
            this.now = Date.now() || (new Date).getTime(); // Current tick's time
            this.then = Date.now() || (new Date).getTime(); // Last tick's time
            this.delta = 0; // Time since last tick
            this.total = 0; // Total time elapsed
            this.periodicFns = {}; // functions to call periodically
        },

        // Register a function to be called every x seconds.
        //   @param key: Unique key for the interval. Can be used to clear the interval later.
        //   @param fn: function to be called periodically with parameters: (iterations, period)
        //     iterations: number of iterations elapsed
        //     period: length (in seconds) of each iteration
        //   @param seconds: Number of seconds between intervals
        //   @param skipFirstInterval: If false, fn is called immediately (time zero). If true, this first call is skipped.
        setInterval: function(key, fn, seconds, skipFirstInterval) {
            var period = seconds * 1000.0;

            this.periodicFns[key] = {
                fn: fn,
                period: period,
                current: skipFirstInterval ? 0 : period
            };
        },

        clearInterval: function(key) {
            delete this.periodicFns[key];
        },

        clearAll: function() {
            this.periodicFns = {};
        },

        /*. Main clock function .*/
        run: function() {
            /*. Calculate time since last tick .*/
            this.now = Date.now() || (new Date).getTime(); // Get current time
            this.delta = this.now - this.then; // Get time since last tick
            this.then = this.now; // Reset last tick time
            this.total += this.delta;

            this._iteratePeriodicFns();

            /*. Run function again as soon as possible without lagging .*/
            window.requestFrame(Game.Util.makeCallback(this, this.run));
        },

        // A periodic function does not run every game loop, it runs every X seconds (to improve performance)
        _iteratePeriodicFns: function() {
            var self = this;

            Game.Util.iterateObject(this.periodicFns, function(key, periodicFn) {
                if (periodicFn === undefined) {
                    // When clearInterval is called, its periodicFn will still be called for the current iteration (the
                    // periodicFn will be undefined however). When this happens, ignore the fn. By next iteration
                    // it won't be called anymore.
                    return;
                }

                periodicFn.current += self.delta;
                if (periodicFn.current >= periodicFn.period) {
                    // TODO Calculate this without a while loop
                    var iterations = 0;
                    while (periodicFn.current >= periodicFn.period) {
                        iterations += 1;
                        periodicFn.current -= periodicFn.period;
                    }
                    //console.log('calling function: ', key);
                    periodicFn.fn(iterations, periodicFn.period / 1000.0); // call function - convert period back to seconds
                }
            });
        }
    };

    Game.Clock = new Clock();




    /*
    *  Todo not sure if this is the best way to do this...
    *  window.setTimeout does not work
    *  E.g. when the user focuses the game window, the Clock will rapidly iterate to catch the game up. If these iterations
    *       call window.setTimeout, those timeouts will occur much later than they should. The timeouts need to occur
    *       in the same game loop, so they can be iterated faster than normal too.
    *  To set up a class to use Timers, call Game.Timers.addTimerSupport(this) in the class's initializer.
    * */

    var currentTimerId = 1;

    /* duration is in milliseconds */
    var Timer = function(onTimeout, duration) {
        this._init(onTimeout, duration);
    };
    Timer.prototype = {
        _init: function(onTimeout, duration) {
            this.id = currentTimerId++;
            this._onTimeout = onTimeout;
            this._durationRemaining = duration;
        },

        update: function(seconds) {
            this._durationRemaining -= seconds * 1000; // convert to milliseconds

            if (this.expired() && this._onTimeout) {
                this._onTimeout();
                this._onTimeout = null; // clear timeout so it can only trigger once
            }
        },

        expired: function() {
            return Game.Util.roundForComparison(this._durationRemaining) <= 0;
        }
    };

    Game.namespace('Timers').Timer = Timer;

    Game.namespace('Timers').addTimerSupport = function(obj) {
        obj._timers = {};
        obj.setTimeout = function(onTimeout, duration) {
            var timer = new Game.Timers.Timer(onTimeout, duration);
            obj._timers[timer.id] = timer;
        };
        obj.updateTimers = function(seconds) {
            Game.Util.iterateObject(obj._timers, function(timerId, timer) {
                timer.update(seconds);
                if (timer.expired()) {
                    delete obj._timers[timerId];
                }
            });
        };
        obj.clearTimers = function() {
            obj._timers = {};
        };
    };

}(jQuery));