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
            this._$shieldValue = $playerBars.find('.shield-value');
            this._$energyBar = $playerBars.find('.energy-bar');
            this._$energyValue = $playerBars.find('.energy-value');

            this._$effectsContainer = $('.effects-container');

            this._drawAbilityIcons();
            this._setupAbilityHandlers();

            Game.Clock.setInterval(CLOCK_KEY, function(iterations, seconds) {
                // Only draw once (no matter how many iterations)
                self._drawBar();
                self._drawEffects();
            }, 1.0 / UPDATES_PER_SECOND);
        },

        _setupAbilityHandlers: function() {
            $('.ability-container').find('.game-button').each(function(index) {
                $(this).off('click').on('click', function(evt) {
                    evt.preventDefault();
                    Game.World.Player.castAbility(index);
                });
            })
        },

        _drawAbilityIcons: function() {
            $('.ability-container').find('.game-button').each(function(index) {
                var ability = Game.World.Player.ability(index);
                $(this).removeClass().addClass('game-button').addClass(ability ? ability.iconClass() : 'blank');
            })
        },

        _drawBar: function() {
            var health = Game.World.Player.health();
            var shield = Game.World.Player.shield();
            var energy = Game.World.Player.energy();

            if (Game.Util.round(health) <= 0) {
                health = 0.0;
                shield = 0.0;
                energy = 0.0;
            }

            if (Game.Util.round(energy) <= 0) {
                energy = 0.0;
            }

            var max = Math.max(health + shield, Game.World.Player.maxHealth());
            var healthPercent = (health / max) * 100.0;
            var shieldPercent = healthPercent + (shield / max) * 100.0;
            var energyPercent = (energy / Game.World.Player.maxEnergy()) * 100.0;
            var gridMaxWidth = Game.World.Player.maxHealth() / max * GRID_BUFFER_SIZE * 100.0;

            // instant width change:
            //this._$healthBar.css('width', healthPercent + '%');
            //this._$shieldBar.css('width', shieldPercent + '%');
            //this._$energyBar.css('width', energyPercent + '%');
            //this._$healthGrid.css('width', gridMaxWidth + '%');

            // animated width change:
            this._$healthBar.animate({width: healthPercent + '%'}, ANIMATION_SPEED);
            this._$shieldBar.animate({width: shieldPercent + '%'}, ANIMATION_SPEED);
            this._$energyBar.animate({width: energyPercent + '%'}, ANIMATION_SPEED);
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

            this._$healthValue.html(this._formatValue(health));
            this._$shieldValue.html(Game.Util.round(shield) === 0 ? '' : '(' + this._formatValue(shield) + ')');
            this._$energyValue.html(this._formatValue(energy));
        },

        _drawEffects: function() {
            //             <button class="game-effect vibrating-shield">2s</button>

            var self = this;
            this._$effectsContainer.empty();
            Game.World.Player.effects().forEach(function(effect) {
                $('<button></button>', {
                    text: Game.Util.roundToDecimal(effect.durationLeft(), 0) + 's',
                    'class': 'game-effect ' + effect.iconClass()
                }).appendTo(self._$effectsContainer);
            });
        },

        _formatValue: function(value) {
            return Game.Util.roundToDecimal(value, 0); // todo handle larger numbers appropriately
        }
    };

    Game.BottomBar = new BottomBar();

}(jQuery));