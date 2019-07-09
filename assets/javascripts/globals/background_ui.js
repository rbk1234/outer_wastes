/* BackgroundUI is a Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 1;
    var CLOCK_KEY = 'BackgroundUI';

    var LEFT_OFFSET = 5;
    var MAX_COLUMNS = 120;

    var FONT_SIZE = 16; // font size in px
    var FONT_WIDTH = FONT_SIZE * 0.6; // for monospace font, the width is 60% of the height
    var BACKGROUND_WIDTH = MAX_COLUMNS * FONT_WIDTH;

    var BackgroundUI = function() {};

    BackgroundUI.prototype = {
        init: function() {
            var self = this;

            this.$background = $('#encounter-background');

            $('.restricted-width').css('width', BACKGROUND_WIDTH);

            Game.Timers.addTimerSupport(this);

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                // Only draw once (no matter how many iterations)
                //self._refreshUI();

                self.updateTimers(iterations * period);
            }, 1.0 / UPDATES_PER_SECOND);

        },

        // TODO Can remove this later. This was a way to do scrolling background
        //var totalOffset = 0;
        //Game.Clock.setInterval('UserInterface_backgroundScroll', function(iterations, period) {
        //    totalOffset += (4 * period * iterations);
        //
        //    self.drawBackground('forest', totalOffset);
        //}, 1.0 / 3);

        drawBackground: function(key) {
            var bgRecord = Game.Levels.Backgrounds[key];
            if (!bgRecord) {
                this._lastBackgroundKey = null;
                this.$background.empty();
                return;
            }

            var image = bgRecord.layout;
            var r, c, numRows = image.length, numCols;

            // Only redraw the background if it's changed since last draw
            if (key === this._lastBackgroundKey) {
                return;
            }
            this._lastBackgroundKey = key;

            // Set up an array to hold the characters
            var background = new Array(numRows);
            for (r = 0; r < numRows; r++) {
                background[r] = new Array(LEFT_OFFSET + MAX_COLUMNS).fill(' ');
            }

            // Iterate through image, unfolding doodads if necessary
            for (r = 0; r < numRows; r++) {
                var row = image[r];
                for (c = 0, numCols = row.length; c < numCols; c++) {
                    if (row[c] && row[c] !== ' ') {
                        var doodadKey = bgRecord.doodads[row[c]];
                        if (doodadKey) {
                            this._addDoodadToBackground(Game.Levels.Doodads[doodadKey], r, c, background);
                        }
                        else {
                            background[r][c] = row[c];
                        }
                    }
                }
            }

            // Join the background array into a single string
            for (r = 0; r < numRows; r++) {
                background[r] = background[r].slice(LEFT_OFFSET, LEFT_OFFSET + MAX_COLUMNS).join('');// + background[r].slice(0, LEFT_OFFSET).join('');
            }

            this.$background.html(background.join('\n'));
        },

        _addDoodadToBackground: function(doodad, startingR, startingC, background) {
            var image = doodad.image;

            for (var r = 0, numRows = image.length; r < numRows; r++) {
                if ((startingR - numRows + r) >= 0) {
                    var row = image[r];
                    for (var c = 0, numCols = row.length; c < numCols; c++) {
                        // Important! If no color, nothing will be drawn. This way, even an 'empty' space (no character)
                        //            can still block a doodad behind it
                        if (!doodad.fills || doodad.fills[r][c] !== ' ') {
                            var color = doodad.fills ? doodad.colors[doodad.fills[r][c]] : '';
                            background[startingR - numRows + r][startingC + c] = "<span class='"+color+"'>"+row[c]+"</span>";
                        }
                    }
                }
            }
        },



    };

    Game.BackgroundUI = new BackgroundUI();


}(jQuery));
