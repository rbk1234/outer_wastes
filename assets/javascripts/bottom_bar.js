/* Handles the bar at the bottom of the screen (health, abilities, etc.) */
/* Singleton */

(function ($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'BottomBar';

    var ANIMATION_SPEED = 30;

    var GRID_BACKGROUND = 'rgba(0,0,0,0)';
    var GRID_LINES = 'rgba(0,0,0,0.5)';
    var GRID_BUFFER_SIZE = 5.0; // shows ticks for bars up to x times normal health bar (i.e. shield can be x times bigger than hp)
    var GRID_NUM_TICKS = 10;
    var GRID_LINE_WIDTH_PX = 1;
    var GRID_PARTITION_SIZE = (100.0 / GRID_NUM_TICKS) / GRID_BUFFER_SIZE;

    var BottomBar = function() {};

    BottomBar.prototype = {

        init: function() {
            var self = this;

            var $playerBars = $('.player-bars');
            this._$healthBar = $playerBars.find('.health-bar');
            this._$healthValue = $playerBars.find('.health-value');
            this._$healthGrid = $playerBars.find('.health-grid');
            this._$shieldBar = $playerBars.find('.shield-bar');
            this._$energyBar = $playerBars.find('.energy-bar');

            Game.Clock.setInterval(CLOCK_KEY, function(iterations, seconds) {
                // Iterate through level updates one by one (cannot batch)
                //while (iterations > 0) {
                //    iterations--;
                //    self._updateBar(seconds);
                //}

                // Only draw once (no matter how many iterations)
                self._drawBar();
            }, 1.0 / UPDATES_PER_SECOND);
        },


        _drawBar: function() {
            var health = Game.World.Player.health();
            if (Game.Util.round(health) <= 0) {
                health = 0.0;
            }

            var max = Math.max(health + Game.World.Player.shield(), Game.World.Player.maxHealth());
            var healthPercent = (health / max) * 100.0;
            var shieldPercent = healthPercent + (Game.World.Player.shield() / max) * 100.0;

            var gridMaxWidth = Game.World.Player.maxHealth() / max * GRID_BUFFER_SIZE * 100.0;

            // instant width change:
            //this._$healthBar.css('width', healthPercent + '%');
            //this._$shieldBar.css('width', shieldPercent + '%');
            //this._$healthGrid.css('width', gridMaxWidth + '%');

            // animated width change:
            this._$healthBar.animate({width: healthPercent + '%'}, ANIMATION_SPEED);
            this._$shieldBar.animate({width: shieldPercent + '%'}, ANIMATION_SPEED);
            this._$healthGrid.animate({width: gridMaxWidth + '%'}, ANIMATION_SPEED);

            this._$healthGrid.css('background',
                'repeating-linear-gradient('+
                'to right,'+
                GRID_BACKGROUND+','+
                GRID_BACKGROUND+' '+(GRID_PARTITION_SIZE)+'%,'
                +GRID_LINES+' '+(GRID_PARTITION_SIZE)+'%,'
                +GRID_LINES+' calc('+GRID_PARTITION_SIZE+'% + '+GRID_LINE_WIDTH_PX+'px)'+
                ')'
            );
        }
    };

    Game.BottomBar = new BottomBar();

}(jQuery));