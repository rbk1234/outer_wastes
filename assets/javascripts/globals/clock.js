/* Handles Game time. Register all periodic functions with Clock.setInterval */
/* Do not use window.setInterval, since that will be paused while browser tab is in the background */
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
        // The fn will be called with parameters: (iterations, period)
        //   iterations = number of iterations elapsed
        //   period = length (in seconds) of each iteration
        setInterval: function(key, fn, seconds) {
            var period = seconds * 1000.0;

            this.periodicFns[key] = {
                fn: fn,
                period: period,
                current: period
            };
        },

        clearInterval: function(key) {
            delete this.periodicFns[key];
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
                    periodicFn.fn(iterations, periodicFn.period / 1000.0); // call function - convert period back to seconds
                }
            });
        }
    };

    Game.Clock = new Clock();

}(jQuery));