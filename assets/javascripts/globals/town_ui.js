/* TownUI is a Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 1;
    var CLOCK_KEY = 'TownUI';


    var TownUI = function() {};

    TownUI.prototype = {
        init: function() {
            var self = this;

            this.$gold = $('#gold-value');

            Game.Timers.addTimerSupport(this);

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                // Only draw once (no matter how many iterations)
                self._refreshUI();

                self.updateTimers(iterations * period);
            }, 1.0 / UPDATES_PER_SECOND);

        },

        _refreshUI: function() {
            this.$gold.html(Game.ResourceEngine.getAmount('gold'));
        },


    };

    Game.TownUI = new TownUI();


}(jQuery));
