/* UserInterface is a Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'UserInterface';

    var CAST_BAR_CLOCK_KEY = 'CastBar';

    /*
        Cast bar / cooldown spinners need high framerates so they can increment smoothly (don't want to tie it to
        normal UPDATES_PER_SECOND because they need at least 60fps). So we start up new Clock intervals when needed.

        Note: Since the animation is just spun off (it's not tied to the actual ability), if we implement things like:
        - getting hit slows down a cast by 0.5 seconds
        - reducing ability cooldowns by 1s (e.g. Ezreal Q)
        We will have to restart the animation (at a partially done state) when the events occur.
     */
    var CAST_BAR_UPDATES_PER_SECOND = 100; // Needs high frame rate to smoothly increment
    var COOLDOWN_UPDATES_PER_SECOND = 60;  // Needs high frame rate to smoothly increment

    var DRAW_COOLDOWN_LINES = false; // Whether to draw two white lines on cooldown timers (like clock hands)

    var HIGHLIGHT_INSTANT_DURATION = 200; // How long to highlight ability buttons for instant cast abilities

    var COMBAT_TEXT_DURATION = 1500; // should match animation-duration in scss
    var COMBAT_TEXT_OFFSET_WINDOW = 1000; // if two texts are shown within this time, offset the second text


    var UserInterface = function() {};

    UserInterface.prototype = {
        init: function() {
            var self = this;

            this._initCastBar();
            this._initAbilityBar();
            this._initPlayerBars();

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                // Only draw once (no matter how many iterations)
                self._refreshUnitFrames();
                self._refreshPlayerBars();
                self._refreshAbilityBar();
                self._refreshAbilityTooltip();
            }, 1.0 / UPDATES_PER_SECOND);
        },



        // ----------------------------------------------------- Unit frame setup and Targeting

        // todo should we just call this after every UnitEngine addUnit?
        loadUnits: function() {
            // clear out old frames
            $('#ally-frames').empty();
            $('#enemy-frames').empty();
            this._targetedUnit = null;

            // cache jquery objects
            this._$frames = {}; // unit id -> $frame
            this._$healthAreas = {}; // unit id -> $healthArea
            this._$healthBars = {}; // unit id -> { $progress: (element), $text: (element) }

            this._$portraitAreas = {}; // unit id -> portrait area
            this._combatTextOffsets = {}; // unit id -> offset data

            this._effects = {}; // effect id -> { $effect: (element), timer: CooldownTimer }
            //this._$effectDurations = {}; // effect id -> duration span

            var self = this;
            Game.UnitEngine.unitsForTeam(Game.Constants.teamIds.player).forEach(function(unit) {
                self._createAllyFrame(unit);

                self._loadUnitIntoFrame(unit);
            });
            Game.UnitEngine.unitsForTeam(Game.Constants.teamIds.computer).forEach(function(unit) {
                self._createEnemyFrame(unit);

                self._loadUnitIntoFrame(unit);

            });
        },

        targetedUnit: function() {
            return this._targetedUnit;
        },

        clearTarget: function() {
            this._targetedUnit = null;
            $('.health-area').removeClass('targeted');
        },

        targetUnit: function(unit) {
            this.clearTarget(); // remove targeting circle from old target
            this._targetedUnit = unit;
            this._$healthAreas[unit.id].addClass('targeted');
        },

        createFloatingText: function(unit, text, textClass) {
            var $area = this._$portraitAreas[unit.id];

            // If two combat texts are shown (for the same unit) within the COMBAT_TEXT_OFFSET_WINDOW, offset one to the side
            var oldOffsetData = this._combatTextOffsets[unit.id];
            var now = Date.now() || (new Date).getTime();
            var isOffset = oldOffsetData && !oldOffsetData.isOffset && (now - oldOffsetData.time < COMBAT_TEXT_OFFSET_WINDOW);
            this._combatTextOffsets[unit.id] = {
                time: now,
                isOffset: isOffset
            };

            var $text = $('<span class="combat-text ' + textClass + ' + ' + (isOffset ? 'offset' : '') + '">' + text + '</span>').appendTo($area);
            window.setTimeout(function() {
                $text.remove();
            }, COMBAT_TEXT_DURATION);
        },

        _createAllyFrame: function(unit) {
            var $frame = $('<div></div>', {
                class: 'ally-frame'
            }).appendTo($('#ally-frames'));

            this._addEffectsArea($frame, unit);
            this._addHealthArea($frame, unit);
            this._addPortraitArea($frame, unit);

            this._$frames[unit.id] = $frame;
        },

        _createEnemyFrame: function(unit) {
            var $frame = $('<div></div>', {
                class: 'enemy-frame'
            }).appendTo($('#enemy-frames'));

            this._addPortraitArea($frame, unit);
            this._addHealthArea($frame, unit);
            this._addEffectsArea($frame, unit);

            this._$frames[unit.id] = $frame;
        },

        _addPortraitArea: function($frame, unit) {
            var $area = $('<div></div>', {
                class: 'portrait-area'
            }).appendTo($frame);

            this._$portraitAreas[unit.id] = $area;
        },

        _addEffectsArea: function($frame, unit) {
            $('<div></div>', {
                class: 'effects-area'
            }).appendTo($frame);
        },

        _addHealthArea: function($frame, unit) {
            var self = this;

            var $healthArea = $('<div></div>', {
                class: 'health-area',
                text: unit.name
            }).appendTo($frame);

            $healthArea.off('click').on('click', function() {
                self.targetUnit(unit);
            });

            this._$healthAreas[unit.id] = $healthArea;
            this._$healthBars[unit.id] = this._addBar($healthArea, 'health', 'shield');
            //this._addBar($healthArea, 'mana');
        },

        _addBar: function($healthArea, barClass, secondaryBar) {
            var barData = {};

            var $bar = $('<div></div>', {
                class: 'bar'
            }).appendTo($healthArea);

            $('<div></div>', {
                class: 'bar-layer background',
                style: 'width: 100%;'
            }).appendTo($bar);

            if (secondaryBar) {
                barData.$secondaryProgress = $('<div></div>', {
                    class: 'bar-layer ' + secondaryBar,
                    style: 'width: 0%;'
                }).appendTo($bar);
            }

            barData.$progress = $('<div></div>', {
                class: 'bar-layer ' + barClass,
                style: 'width: 50%;'
            }).appendTo($bar);

            barData.$text = $('<div></div>', {
                class: 'bar-layer bar-text',
                style: 'width: 100%;'
            }).appendTo($bar);

            return barData;
        },




        _loadUnitIntoFrame: function(unit) {
            var self = this;

            // load existing effects:
            Game.Util.iterateObject(unit.effects(), function(effectId, effect) {
                self.addEffect(unit, effect);
            })
        },

        _refreshUnitFrames: function() {
            var self = this;

            Game.UnitEngine.unitsForTeam(Game.Constants.teamIds.player).forEach(function(ally) {
                self._refreshUnitFrame(ally);
            });
            Game.UnitEngine.unitsForTeam(Game.Constants.teamIds.computer).forEach(function(enemy) {
                self._refreshUnitFrame(enemy);
            });
        },

        _refreshUnitFrame: function(unit) {
            var self = this;

            var healthPercent = unit.percentHealth() + '%';
            this._$healthBars[unit.id].$progress.css('width', healthPercent);
            this._$healthBars[unit.id].$text.html(Game.Util.round(unit.health) + '/' + Game.Util.round(unit.maxHealth.value()));

            if (unit.totalAbsorb() > 0) {
                var shieldPercent = Game.Util.roundForComparison((unit.health + unit.totalAbsorb()) / unit.maxHealth.value()) * 100 + '%';
                this._$healthBars[unit.id].$secondaryProgress.css('width', shieldPercent).addClass('active');
            }
            else {
                this._$healthBars[unit.id].$secondaryProgress.css('width', 0).removeClass('active');
            }

            // refresh effects
            // TODO Not doing this anymore (not showing duration in seconds)
            //Game.Util.iterateObject(unit.effects(), function(effectId, effect) {
            //    self._$effectDurations[effectId].html(Game.Util.formatDuration(effect.durationLeft()));
            //});
        },







        // ----------------------------------------------------- Effects

        addEffect: function(unit, effect) {
            var $effectsArea = this._$frames[unit.id].find('.effects-area');

            var $effect = $('<div></div>', {
                class: 'effect ' + effect.icon + ' ' + effect.background + ' ' + (effect.hidden ? 'hidden' : '')
            }).appendTo($effectsArea);

            if (unit.teamId === Game.Constants.teamIds.player) {
                $effect.prependTo($effectsArea);
            }
            else {
                $effect.appendTo($effectsArea);
            }

            //$('<span></span>', {
            //    class: 'effect-name',
            //    text: effect.name
            //}).appendTo($effect);

            //var $duration = $('<span></span>', {
            //    class: 'duration'
            //}).appendTo($effect);

            $('<canvas></canvas>', {
                class: 'cooldown-status'
            }).appendTo($effect);

            var timer = new CooldownTimer($effect, 'Effect_'+effect.id, true);

            if (effect.hasDuration) {
                var totalCooldown = effect.duration.value();
                var elapsed = totalCooldown - effect.durationLeft();
                timer.startCooldown(totalCooldown, elapsed);
            }

            this._effects[effect.id] = {
                $effect: $effect,
                timer: timer
            };
            //this._$effectDurations[effect.id] = $duration;
        },

        removeEffect: function(unit, effect) {
            this._effects[effect.id].$effect.remove();
            delete this._effects[effect.id];
            //delete this._$effectDurations[effect.id];
        },

        // Refresh an existing effect so it stays in the same place (won't jump to end of $effectsArea)
        refreshEffect: function(unit, oldEffect, newEffect) {
            this._effects[newEffect.id] = this._effects[oldEffect.id];
            delete this._effects[oldEffect.id];

            if (newEffect.hasDuration) {
                var totalCooldown = newEffect.duration.value();
                var elapsed = totalCooldown - newEffect.durationLeft();
                this._effects[newEffect.id].timer.startCooldown(totalCooldown, elapsed);
            }
        },







        // ----------------------------------------------------- Ability Bar

        _initAbilityBar: function() {
            // Esc key
            Game.Keyboard.registerKey(27, function() {
                Game.Player.cancelCast('Interrupted');
            });

            this._$abilityButtons = {}; // ability id -> $button
            this._abilityCooldowns = {}; // ability id -> CooldownTimer

            var $abilityTooltip = $('#ability-tooltip');
            this._abilityTooltip = {
                ability: null,
                $tip: $abilityTooltip,
                $name: $abilityTooltip.find('.name'),
                $manaCost: $abilityTooltip.find('.mana-cost'),
                $castTime: $abilityTooltip.find('.cast-time'),
                $cooldown: $abilityTooltip.find('.cooldown'),
                $cooldownRemaining: $abilityTooltip.find('.cooldown-remaining'),
                $description: $abilityTooltip.find('.description')
            };
        },

        startCooldown: function(ability, totalCooldown, elapsed) {
            this._abilityCooldowns[ability.id].startCooldown(totalCooldown, elapsed);
        },

        // TODO clean this code up... it's messy right now to handle empty slots
        assignAbilityToBar: function(ability, index) {
            var self = this;

            var $button = $('#ability-bar').find('.action-bar-button:nth-child('+(index + 1)+')'); // nth-child is 1-based

            if (ability) {
                this._$abilityButtons[ability.id] = $button;

                //$button.find('.spell-name').html(ability.name);
                $button.removeClass('blank');
                $button.addClass(ability.icon);
                $button.addClass(ability.background);
            }

            $button.off('click').on('click', function(evt) {
                if (ability) {
                    var target = evt.altKey ? Game.Player : self.targetedUnit();
                    Game.Player.castAbility(ability.id, target);
                }
            });

            var keyCode = this._keyCodeForAbilityIndex(index);
            if (keyCode !== null) {
                Game.Keyboard.registerKey(keyCode, function(evt) {
                    if (ability) {
                        var target = evt.altKey ? Game.Player : self.targetedUnit();
                        Game.Player.castAbility(ability.id, target);
                    }
                    self._toggleButtonPressed($button, true);
                }, function(evt) {
                    self._toggleButtonPressed($button, false);
                });
            }

            if (ability) {
                this._abilityCooldowns[ability.id] = new CooldownTimer($button, 'Ability_'+ability.id);

                $button.off('mouseenter').on('mouseenter', function(evt) {
                    self._showAbilityTooltip(ability);
                });
                $button.off('mouseleave').on('mouseleave', function(evt) {
                    self._hideAbilityTooltip();
                });
            }

        },

        // todo removeAbilityFromBar... delete $abilityButton and abilityCooldown

        // Note: ability cooldown timers are handled separately
        _refreshAbilityBar: function() {
            var self = this;

            // refreshes if buttons are oom or not
            Game.Util.iterateObject(this._$abilityButtons, function(abilityId, $button) {
                var ability = Game.Player.abilities()[abilityId];
                self._toggleAbilityOom(ability, !Game.Player.hasManaForAbility(ability));
            });
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

        _toggleButtonPressed: function($button, isPressed) {
            $button.toggleClass('pressed', isPressed);
        },

        _toggleAbilityCasting: function(ability, isCasting) {
            this._$abilityButtons[ability.id].toggleClass('casting', isCasting);
        },

        _toggleAbilityOom: function(ability, isOom) {
            this._$abilityButtons[ability.id].toggleClass('not-enough-mana', isOom);
        },

        _showAbilityTooltip: function(ability) {
            this._abilityTooltip.ability = ability;
            this._refreshAbilityTooltip();
            this._abilityTooltip.$tip.show();
        },

        _hideAbilityTooltip: function() {
            this._abilityTooltip.ability = null; // null out ability so tooltip stops refreshing
            this._abilityTooltip.$tip.hide();
        },

        _refreshAbilityTooltip: function() {
            var ability = this._abilityTooltip.ability;
            if (!ability) {
                return;
            }

            this._abilityTooltip.$name.html(ability.name);

            var manaCost = (ability.manaCost.value() === 0) ? '' : (Game.Util.round(ability.manaCost.value()) + ' Mana');
            this._abilityTooltip.$manaCost.html(manaCost);

            var castTime = (ability.castTime.value() === 0) ? 'Instant' : (Game.Util.roundToDecimal(ability.castTime.value(), 2) + ' sec cast');
            this._abilityTooltip.$castTime.html(castTime);

            var cooldown = (ability.cooldown.value() === 0) ? '' : (Game.Util.roundToDecimal(ability.cooldown.value(), 2) + ' sec cooldown');
            this._abilityTooltip.$cooldown.html(cooldown);

            var cooldownRemaining = ability.isReady() ? '' : ('Cooldown remaining: ' + Game.Util.round(ability.remainingCooldown()) + ' sec');
            this._abilityTooltip.$cooldownRemaining.html(cooldownRemaining);

            this._abilityTooltip.$description.html(ability.description());
        },





        // ----------------------------------------------------- Player Bars (health/mana in bottom left)

        _initPlayerBars: function() {
            var $health = $('#player-health');
            this._playerHealth = {
                $progress: $health.find('.health'),
                $text: $health.find('.bar-text')
            };

            var $mana = $('#player-mana');
            this._playerMana = {
                $progress: $mana.find('.mana'),
                $text: $mana.find('.bar-text')
            };
        },

        _refreshPlayerBars: function() {
            var healthWidth = Game.Util.roundForComparison(Game.Player.health / Game.Player.maxHealth.value()) * 100 + '%';
            this._playerHealth.$progress.css('width', healthWidth);
            this._playerHealth.$text.html(Game.Util.round(Game.Player.health) + '/' + Game.Util.round(Game.Player.maxHealth.value()));

            var widthPercent = Game.Util.roundForComparison(Game.Player.mana / Game.Player.maxMana.value()) * 100 + '%';
            this._playerMana.$progress.css('width', widthPercent);
            this._playerMana.$text.html(Game.Util.round(Game.Player.mana) + '/' + Game.Util.round(Game.Player.maxMana.value()));
        },








        // ----------------------------------------------------- Cast bar

        _initCastBar: function() {
            this._$castBar = $('#cast-bar');
            this._$castProgress = this._$castBar.find('.cast-progress');
            this._$castText = this._$castBar.find('.bar-text');
        },

        // todo these will eventually need to pass unit (so we can show cast bar for appropriate unit, and only highlight abil if player)
        startCast: function(ability) {
            var self = this;
            
            var castLength = ability.castTime.value();
            if (castLength !== 0) {
                // Has cast time; show cast bar, highlight ability
                this._startCastBar(ability.name, castLength);
                this._toggleAbilityCasting(ability, true);
            }
            else {
                // Instant cast; briefly highlight ability even though it was instant cast
                this._toggleAbilityCasting(ability, true);
                window.setTimeout(function() {
                    self._toggleAbilityCasting(ability, false);
                }, HIGHLIGHT_INSTANT_DURATION);
            }
        },

        cancelCast: function(ability, message) {
            this._cancelCastBar(message);
            this._toggleAbilityCasting(ability, false);
        },

        finishCast: function(ability) {
            this._completeCastBar();
            this._toggleAbilityCasting(ability, false);
        },

        _startCastBar: function(text, castLength) {
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

        _completeCastBar: function() {
            Game.Clock.clearInterval(CAST_BAR_CLOCK_KEY);

            this._$castProgress.css('width', '100%')
                .removeClass('casting cast-complete cast-canceled')
                .addClass('cast-complete');
            this._$castBar.fadeOut(500);
        },

        _cancelCastBar: function(message) {
            Game.Clock.clearInterval(CAST_BAR_CLOCK_KEY);

            this._$castProgress.css('width', '100%')
                .removeClass('casting cast-complete cast-canceled')
                .addClass('cast-canceled');
            this._$castText.html(Game.Util.defaultFor(message, 'Failed'));
            this._$castBar.fadeOut(500);
        }

    };

    Game.UserInterface = new UserInterface();



    /*
     CooldownTimer:

     Handles radial shading of buttons/effects (to display cooldowns)
     Radial shading code has been adapted from https://codepen.io/jeremywynn/pen/emLjyL

     param clockKey:
         Make sure to give each CooldownTimer a unique clockKey
     param invertShades:
         If true, when cooldown starts the entire canvas will be blank and will slowly become shaded
         If false, when cooldown starts the entire canvas will be shaded and will slowly become unshaded (default)
     */
    var CooldownTimer = function($container, clockKey, invertShades) {
        this._init($container, clockKey, invertShades);
    };
    CooldownTimer.prototype = {
        _init: function($container, clockKey, invertShades) {
            this.$container = $container;
            this.container = this.$container.get(0);
            this.$canvas = this.$container.find('canvas');
            this.canvas = this.$canvas.get(0);
            this.context = this.canvas.getContext('2d');

            this.clockKey = clockKey;
            this.invertShades = invertShades;
        },

        startCooldown: function(totalCooldown, elapsed) {
            var self = this;

            this.endCooldown();

            if (elapsed >= totalCooldown) {
                return; // Don't need to start anything
            }

            // Set up a temporary interval for the spinner that updates at a very high framerate
            Game.Clock.setInterval(this.clockKey, function(iterations, period) {
                elapsed += iterations * period;
                var percentComplete = elapsed / totalCooldown;

                // For debugging:
                //if (percentComplete >= 0.5) {
                //    Game.Clock.clearInterval(self.clockKey);
                //    return;
                //}

                if (Game.Util.roundForComparison(percentComplete) >= 1.0) {
                    self.endCooldown();
                }
                else {
                    self._drawCooldown(percentComplete);
                }
            }, 1.0 / COOLDOWN_UPDATES_PER_SECOND);
        },

        endCooldown: function() {
            Game.Clock.clearInterval(this.clockKey);
            this._clearCanvas();
        },

        _clearCanvas: function() {
            this.context.setTransform(1, 0, 0, 1, 0, 0);

            if (this.invertShades) {
                // Fill context with a shaded grey
                this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
            else {
                // Clear all shaded grey
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        },

        _drawCooldown: function(percentComplete) {
            var degrees = 360 * percentComplete;
            var hypotenuse = Math.sqrt(Math.pow(this.container.clientWidth, 2) + Math.pow(this.container.clientHeight, 2));
            var radius = hypotenuse / 2;

            this._clearCanvas();

            this.canvas.height = hypotenuse;
            this.canvas.width = hypotenuse;

            this.canvas.style.marginLeft = -radius + "px";
            this.canvas.style.marginTop = -radius + "px";

            this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';

            this.context.translate(this.canvas.width/2, this.canvas.height/2);

            // Orient context so that 0 degrees is pointing North
            this.context.rotate(-Math.PI/2);

            if (DRAW_COOLDOWN_LINES) {
                // Draw line towards origin (North)
                this.context.beginPath();
                this.context.moveTo(0, 0);
                this.context.lineTo(radius * Math.cos(0).toFixed(15), radius * Math.sin(0).toFixed(15));
                this.context.lineWidth = 2;
                this.context.strokeStyle = 'rgba(255, 255, 255, 0.9)';
                this.context.shadowColor = 'rgba(255, 255, 255, 0.6)';
                this.context.shadowBlur = 10;
                this.context.stroke();

                // Draw line towards degree offset
                this.context.moveTo(0, 0);
                this.context.lineTo(radius * Math.cos(degrees * Math.PI/180).toFixed(15), radius * Math.sin(degrees * Math.PI/180).toFixed(15));
                this.context.stroke();
            }
            else {
                // Not drawing lines, just start at origin
                this.context.beginPath();
                this.context.moveTo(0, 0);
                this.context.stroke();
            }

            // Draw a filled arc
            this.context.shadowColor = null;
            this.context.shadowBlur = null;
            if (this.invertShades) {
                // Draw arc from current spot (degrees * Math.PI/180) counterclockwise towards origin (0)
                this.context.arc(0, 0, radius, degrees * Math.PI/180, 0, true);
            }
            else {
                // Draw arc from current spot (degrees * Math.PI/180) clockwise towards origin (Math.PI*2)
                this.context.arc(0, 0, radius, degrees * Math.PI/180, Math.PI*2, false);
            }
            this.context.fill();
            this.context.closePath();
        }

    };


}(jQuery));
