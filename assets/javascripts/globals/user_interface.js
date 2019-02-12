/* Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'UserInterface';

    var CAST_BAR_CLOCK_KEY = 'CastBar';
    var CAST_BAR_UPDATES_PER_SECOND = 100; // Needs high frame rate to smoothly increment

    var UserInterface = function() {};

    UserInterface.prototype = {
        init: function() {
            var self = this;

            this._initCastBar();
            this._initAbilityBar();

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                // Only draw once (no matter how many iterations)
                self._refreshUnitFrames();
            }, 1.0 / UPDATES_PER_SECOND);
        },

        targetedUnit: function() {
            return this._targetedUnit;
        },

        // todo should we just call this after every UnitEngine addAlly/addEnemy?
        loadUnits: function() {
            // clear out old frames
            $('#ally-frames').empty();
            $('#enemy-frames').empty();
            this._targetedUnit = null;

            var self = this;
            Game.UnitEngine.allies().forEach(function(unit) {
                self._createAllyFrame(unit);
            });
            Game.UnitEngine.enemies().forEach(function(unit) {
                self._createEnemyFrame(unit);
            });

        },

        _createAllyFrame: function(unit) {
            var $frame = $('<div></div>', {
                class: 'ally-frame'
            }).appendTo($('#ally-frames'));

            this._addBars($frame, unit);

            $('<div></div>', {
                class: 'effects',
                //text: 'buff1 buff2 buff3'
            }).appendTo($frame);
        },
        _createEnemyFrame: function(unit) {
            var $frame = $('<div></div>', {
                class: 'enemy-frame'
            }).appendTo($('#enemy-frames'));

            $('<div></div>', {
                class: 'effects',
                //text: 'buff1 buff2 buff3'
            }).appendTo($frame);

            this._addBars($frame, unit);
        },
        _addBars: function($frame, unit) {
            var self = this;

            var $bars = $('<div></div>', {
                class: 'bars',
                text: unit.name()
            }).appendTo($frame);

            $bars.off('click').on('click', function() {
                self._targetedUnit = unit;
                $('.bars').removeClass('targeted');
                $bars.addClass('targeted');
            });

            this._addBar($bars, 'health');
            //this._addBar($bars, 'mana');
        },
        _addBar: function($bars, barClass) {
            var $bar = $('<div></div>', {
                class: 'bar'
            }).appendTo($bars);
            $('<div></div>', {
                class: 'bar-layer background',
                style: 'width: 100%;'
            }).appendTo($bar);
            $('<div></div>', {
                class: 'bar-layer ' + barClass,
                style: 'width: 50%;'
            }).appendTo($bar);
        },

        _refreshUnitFrames: function() {
            var self = this;

            $('#ally-frames').find('.ally-frame').each(function(index) {
                var $frame = $(this);
                var unit = Game.UnitEngine.allies()[index];
                var widthPercent = Game.Util.round(unit._health / unit.getStat('maxHealth')) * 100 + '%';
                $frame.find('.bar-layer.health').css('width', widthPercent);
            });
            $('#enemy-frames').find('.enemy-frame').each(function(index) {
                var $frame = $(this);
                var unit = Game.UnitEngine.enemies()[index];
                var widthPercent = Game.Util.round(unit._health / unit.getStat('maxHealth')) * 100 + '%';
                $frame.find('.bar-layer.health').css('width', widthPercent);
            });
        },

        _initCastBar: function() {
            this._$castBar = $('#cast-bar');
            this._$castProgress = this._$castBar.find('.cast-progress');
            this._$castText = this._$castBar.find('.bar-text');
        },
        _initAbilityBar: function() {
            $('#ability-bar').find('.game-button').each(function(index) {
                if (index === 0) {
                    $(this).off('click').on('click', function() {
                        Game.Player.castAbility('heal');
                    });
                }
                if (index === 1) {
                    $(this).off('click').on('click', function() {
                        Game.Player.cancelCast('Interrupted');
                    });
                }
            });

            Game.Keyboard.registerKey(49, function() {
                Game.Player.castAbility('heal');
            });
            Game.Keyboard.registerKey(50, function() {
                Game.Player.cancelCast('Interrupted');
            });
        },



        startCast: function(text, castLength) {
            var self = this;

            // Set up a temporary interval for the cast bar that updates at a very high framerate
            var accumulatedSeconds = 0;
            Game.Clock.setInterval(CAST_BAR_CLOCK_KEY, function(iterations, period) {
                accumulatedSeconds += iterations * period;
                self._$castProgress.css('width', (accumulatedSeconds / castLength) * 100 + '%');
            }, 1.0 / CAST_BAR_UPDATES_PER_SECOND);

            this._$castProgress.css('width', '0%')
                .removeClass('casting cast-complete cast-canceled')
                .addClass('casting');
            this._$castText.html(text);
            this._$castBar.stop(); // stop any fade out animations (from completes/cancels right before)
            this._$castBar.fadeIn(0);
        },
        castComplete: function() {
            Game.Clock.clearInterval(CAST_BAR_CLOCK_KEY);

            this._$castProgress.css('width', '100%')
                .removeClass('casting cast-complete cast-canceled')
                .addClass('cast-complete');
            this._$castBar.fadeOut(500);
        },
        cancelCast: function(message) {
            Game.Clock.clearInterval(CAST_BAR_CLOCK_KEY);

            this._$castProgress.css('width', '100%')
                .removeClass('casting cast-complete cast-canceled')
                .addClass('cast-canceled');
            this._$castText.html(Game.Util.defaultFor(message, 'Failed'));
            this._$castBar.fadeOut(500);
        }

    };

    Game.UserInterface = new UserInterface();

}(jQuery));
