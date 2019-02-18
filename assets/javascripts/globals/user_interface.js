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
            this._initManaBar();

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                // Only draw once (no matter how many iterations)
                self._refreshUnitFrames();
                self._refreshManaBar();
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

            // cache jquery objects
            this._$frames = {}; // unit id -> $frame
            this._$healthBars = {}; // unit id -> health bar
            this._$effects = {}; // effect id -> $effect
            this._$effectDurations = {}; // effect id -> duration span

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

            this._addEffectsArea($frame);
            this._addHealthArea($frame, unit);

            this._$frames[unit.id] = $frame;
        },
        _createEnemyFrame: function(unit) {
            var $frame = $('<div></div>', {
                class: 'enemy-frame'
            }).appendTo($('#enemy-frames'));

            this._addHealthArea($frame, unit);
            this._addEffectsArea($frame);

            this._$frames[unit.id] = $frame;
        },
        _addEffectsArea: function($frame) {
            var $temp = $('<div></div>', {
                class: 'effects-area'
            }).appendTo($frame);

            // todo remove
            //$('<div class="effect blank"><span class="effect-name">'+'buff1'+'</span><span class="duration">3s</span></div>').appendTo($temp);
            //$('<div class="effect blank"><span class="effect-name">'+'buff2'+'</span><span class="duration">2s</span></div>').appendTo($temp);
        },
        _addHealthArea: function($frame, unit) {
            var self = this;

            var $healthArea = $('<div></div>', {
                class: 'health-area',
                text: unit.name
            }).appendTo($frame);

            $healthArea.off('click').on('click', function() {
                self._targetedUnit = unit;
                $('.health-area').removeClass('targeted');
                $healthArea.addClass('targeted');
            });

            this._$healthBars[unit.id] = this._addBar($healthArea, 'health');
            //this._addBar($healthArea, 'mana');
        },
        _addBar: function($healthArea, barClass) {
            var $bar = $('<div></div>', {
                class: 'bar'
            }).appendTo($healthArea);
            $('<div></div>', {
                class: 'bar-layer background',
                style: 'width: 100%;'
            }).appendTo($bar);

            return $('<div></div>', {
                class: 'bar-layer ' + barClass,
                style: 'width: 50%;'
            }).appendTo($bar);
        },

        _refreshUnitFrames: function() {
            var self = this;

            Game.UnitEngine.allies().forEach(function(ally) {
                self._refreshUnitFrame(ally);
            });
            Game.UnitEngine.enemies().forEach(function(enemy) {
                self._refreshUnitFrame(enemy);
            });
        },
        _refreshUnitFrame: function(unit) {
            var self = this;

            var widthPercent = Game.Util.round(unit.health / unit.maxHealth.value()) * 100 + '%';
            this._$healthBars[unit.id].css('width', widthPercent);

            // refresh effects
            Game.Util.iterateObject(unit.effects(), function(effectId, effect) {
                self._$effectDurations[effectId].html(Game.Util.formatDuration(effect.durationLeft()));
            });
        },
        addEffect: function(unit, effect) {
            var $effectsArea = this._$frames[unit.id].find('.effects-area');

            var $effect = $('<div></div>', {
                class: 'effect blank'
            }).appendTo($effectsArea);

            if (unit.isAlly()) {
                $effect.prependTo($effectsArea);
            }
            else {
                $effect.appendTo($effectsArea);
            }

            $('<span></span>', {
                class: 'effect-name',
                text: effect.name
            }).appendTo($effect);

            var $duration = $('<span></span>', {
                class: 'duration'
            }).appendTo($effect);

            this._$effects[effect.id] = $effect;
            this._$effectDurations[effect.id] = $duration;
        },
        removeEffect: function(unit, effect) {
            this._$effects[effect.id].remove();
            delete this._$effects[effect.id];
            delete this._$effectDurations[effect.id];
        },

        _initAbilityBar: function() {
            // Esc
            Game.Keyboard.registerKey(27, function() {
                Game.Player.cancelCast('Interrupted');
            });
        },
        assignAbilityToBar: function(abilityKey, index) {
            var ability = Game.Player.getAbility(abilityKey);

            var $button = $('#ability-bar').find('.action-bar-button:nth-child('+(index + 1)+')'); // nth-child is 1-based
            $button.find('.spell-name').html(ability.name);
            $button.off('click').on('click', function() {
                Game.Player.castAbility(abilityKey);
            });

            var keyCode = this._keyCodeForAbilityIndex(index);
            if (keyCode !== null) {
                Game.Keyboard.registerKey(keyCode, function() {
                    Game.Player.castAbility(abilityKey);
                });
            }
        },
        _keyCodeForAbilityIndex: function(index) {
            switch(index) {
                case 0:
                    return 49;
                case 1:
                    return 50;
                case 2:
                    return 51;
                case 3:
                    return 52;
                case 4:
                    return 53;
                case 5:
                    return 54;
                default:
                    return null;
            }
        },

        _initManaBar: function() {
            this._$manaBar = $('#mana-bar');
            this._$mana = this._$manaBar.find('.mana');
        },
        _refreshManaBar: function() {
            var widthPercent = Game.Util.round(Game.Player.mana / Game.Player.maxMana.value()) * 100 + '%';
            this._$mana.css('width', widthPercent);
        },

        _initCastBar: function() {
            this._$castBar = $('#cast-bar');
            this._$castProgress = this._$castBar.find('.cast-progress');
            this._$castText = this._$castBar.find('.bar-text');
        },

        startCastBar: function(text, castLength) {
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
        completeCastBar: function() {
            Game.Clock.clearInterval(CAST_BAR_CLOCK_KEY);

            this._$castProgress.css('width', '100%')
                .removeClass('casting cast-complete cast-canceled')
                .addClass('cast-complete');
            this._$castBar.fadeOut(500);
        },
        cancelCastBar: function(message) {
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
