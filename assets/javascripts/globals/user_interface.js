/* UserInterface is a Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'UserInterface';

    var MAX_UNIT_FRAMES = 5;
    var FRAME_COLUMNS = 5;

    /*
        Cast bar / cooldown spinners need high framerates so they can increment smoothly (don't want to tie it to
        normal UPDATES_PER_SECOND because they need at least 60fps). So we start up new Clock intervals when needed.

        Note: Since the animation is just spun off (it's not tied to the actual ability), if we implement things like:
        - getting hit slows down a cast by 0.5 seconds
        - reducing ability cooldowns by 1s (e.g. Ezreal Q)
        We will have to restart the animation (at a partially done state) when the events occur.

        TODO there are issues if a buff is applied while another tab is in focus
     */
    var CAST_BAR_CLOCK_KEY = 'CastBar';
    var CAST_BAR_UPDATES_PER_SECOND = 100; // Needs high frame rate to smoothly increment
    var COOLDOWN_UPDATES_PER_SECOND = 60;  // Needs high frame rate to smoothly increment

    var DRAW_COOLDOWN_LINES = false; // Whether to draw two white lines on cooldown timers (like clock hands)

    var HIGHLIGHT_INSTANT_DURATION = 200; // How long to highlight ability buttons for instant cast abilities

    var COMBAT_TEXT_DURATION = 1500; // should match animation-duration in scss
    var COMBAT_TEXT_OFFSET_WINDOW = 1000; // if two texts are shown within this time, offset the second text
    var COMBAT_TEXT_COLUMNS = 3;

    var SPELLBOOK_COLS = 2;
    var SPELLBOOK_ROWS = 4;


    var UserInterface = function() {};

    UserInterface.prototype = {
        init: function() {
            var self = this;

            this._initDetailedFrames();
            this._initUnitFrames();
            this._initCastBar();
            this._initAbilityBar();
            this._initPlayerBars();
            this._initEffects();
            this._initLevelUI();

            this._initMap();

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                // Only draw once (no matter how many iterations)
                self._refreshDetailedFrames();
                self._refreshUnitFrames();
                self._refreshPlayerBars();
                self._refreshAbilityBar();
                self._refreshAbilityTooltip();
            }, 1.0 / UPDATES_PER_SECOND);
        },








        // ----------------------------------------------------- Detailed frames (one for the player, one for the target)


        _initDetailedFrames: function() {
            this._playerFrame = this._createDetailedFrame($('#player-frame'), 'player');
            this._targetFrame = this._createDetailedFrame($('#target-frame'), 'target');
        },
        _createDetailedFrame: function($frame, frameType) {
            var $healthBar = $frame.find('.health-bar');
            var $manaBar = $frame.find('.mana-bar');
            var $castBar = $frame.find('.cast-bar');

            // Cache jquery references to elements that will need constant updating
            return {
                frameType: frameType,
                effects: {},

                $frame: $frame,
                $name: $frame.find('.name'),

                $portrait: $frame.find('.portrait'),

                $effectsArea: $frame.find('.effects-area'),

                $healthBarProgress: $healthBar.find('.bar-layer.health'),
                $healthBarShield: $healthBar.find('.bar-layer.shield'),
                $healthBarText: $healthBar.find('.bar-layer.bar-text'),

                $manaBarProgress: $manaBar.find('.bar-layer.mana'),
                $manaBarText: $manaBar.find('.bar-layer.bar-text'),

                $castBar: $castBar,
                $castBarProgress: $castBar.find('.bar-layer.cast-progress'),
                $castBarText: $castBar.find('.bar-layer.bar-text')
            };
        },

        _loadDetailedFrame: function(frame, unit) {
            var self = this;

            this._clearDetailedFrame(frame);

            if (!unit) {
                return;
            }

            frame.$name.html(unit.name);

            // portrait
            var $pre = $('<pre></pre>');
            unit.portrait().forEach(function(imageRow) {
                $('<span>'+imageRow+'</span><br>').appendTo($pre);
            });
            frame.$portrait.empty();
            $pre.appendTo(frame.$portrait);

            // load existing effects:
            this._removeAllEffectsInFrame(this._targetFrame);
            Game.Util.iterateObject(unit.effects(), function(effectId, effect) {
                self._addEffectToFrame(self._targetFrame, effect);
            });

            // TODO Load current cast

            // do a normal refresh to get other stuff
            this._refreshDetailedFrame(frame, unit);

            frame.$frame.visible();
        },
        _clearDetailedFrame: function(frame) {
            frame.$frame.invisible();

            this._removeAllEffectsInFrame(frame);

            // todo stop updates
        },
        _refreshDetailedFrames: function() {
            this._refreshDetailedFrame(this._playerFrame, Game.Player);
            this._refreshDetailedFrame(this._targetFrame, this.selectedUnit());
        },
        _refreshDetailedFrame: function(frame, unit) {
            if (!unit) {
                return;
            }

            var healthPercent = unit.percentHealth() + '%';
            frame.$healthBarProgress.css('width', healthPercent);
            frame.$healthBarText.html(Game.Util.round(unit.health) + '/' + Game.Util.round(unit.maxHealth.value()));

            if (unit.totalAbsorb() > 0) {
                var shieldPercent = Game.Util.roundForComparison((unit.health + unit.totalAbsorb()) / unit.maxHealth.value()) * 100 + '%';
                frame.$healthBarShield.css('width', shieldPercent).addClass('active');
            }
            else {
                frame.$healthBarShield.css('width', 0).removeClass('active');
            }

            if (unit.maxMana.value() === null) {
                frame.$manaBarProgress.css('width', '0%');
                frame.$manaBarText.html('');
            }
            else {
                var manaPercent = unit.percentMana() + '%';
                frame.$manaBarProgress.css('width', manaPercent);
                frame.$manaBarText.html(Game.Util.round(unit.mana) + '/' + Game.Util.round(unit.maxMana.value()));
            }
        },











        // ----------------------------------------------------- Unit frames

        _initUnitFrames: function() {
            var $allyFramesContainer = $('#ally-frames');
            var $enemyFramesContainer = $('#enemy-frames');

            this._allyFrames = [];
            this._enemyFrames = [];

            this._allyIndices = {}; // Mapping of unit id -> array index of unit
            this._enemyIndices = {}; // Mapping of unit id -> array index of unit

            for (var i = 0; i < MAX_UNIT_FRAMES; i++) {
                this._allyFrames.push(this._createUnitFrame($allyFramesContainer, Game.Constants.teamIds.player, i));
                this._enemyFrames.push(this._createUnitFrame($enemyFramesContainer, Game.Constants.teamIds.computer, i));
            }

            this._setupFrameKeybinds();
        },

        _createUnitFrame: function($container, teamId, index) {
            var self = this;

            var $template = $('#unit-frame-template');
            var $frame = $template.clone();
            $frame.removeAttr('id');

            if (teamId === Game.Constants.teamIds.player) {
                $frame.prependTo($container);
            }
            else {
                $frame.appendTo($container);
            }

            $frame.find('.click-target').off('click').on('click', function() {
                self.targetIndex(teamId, index);
            });

            var $healthBar = $frame.find('.health-bar');
            var $castBar = $frame.find('.cast-bar');

            // Cache jquery references to elements that will need constant updating
            return {
                frameType: 'unit',
                effects: {},
                animations: {},

                $frame: $frame,
                $name: $frame.find('.name'),

                $combatTextArea: $frame.find('.combat-text-area'),
                $clickableArea: $frame.find('.clickable-area'),
                $image: $frame.find('.image'),
                $unitImage: $frame.find('.image .unit-pre'),

                $effectsArea: $frame.find('.effects-area'),

                $healthBarProgress: $healthBar.find('.bar-layer.health'),
                $healthBarShield: $healthBar.find('.bar-layer.shield'),
                $healthBarText: $healthBar.find('.bar-layer.bar-text'),

                $castBar: $castBar,
                $castBarProgress: $castBar.find('.bar-layer.cast-progress'),
                $castBarText: $castBar.find('.bar-layer.bar-text'),

                combatTextOffsets: {}
            };
        },

        // Returns the frame object (object with jquery references) for a unit
        _getUnitFrame: function(unit) {
            if (unit.teamId === Game.Constants.teamIds.player) {
                return this._allyFrames[this._allyIndices[unit.id]];
            }
            else {
                return this._enemyFrames[this._enemyIndices[unit.id]];
            }
        },

        _setupFrameKeybinds: function() {
            var self = this;

            // -------- Can use keyboard arrow keys to target units:
            // TODO Skip dead units

            function targetFirstAlly() {
                self.targetIndex(Game.Constants.teamIds.player, 0);
            }

            function targetNextIndex(currentTeamId, currentIndex) {
                var units = Game.UnitEngine.unitsForTeam(currentTeamId);

                if (currentIndex < (units.length - 1)) {
                    // target next index in same team
                    self.targetIndex(currentTeamId, currentIndex + 1);
                }
                else {
                    // target last index of other team
                    var otherTeamId = Game.UnitEngine.opposingTeamId(currentTeamId);
                    var otherUnits = Game.UnitEngine.unitsForTeam(otherTeamId);
                    self.targetIndex(otherTeamId, otherUnits.length - 1);
                }
            }
            function targetPreviousIndex(currentTeamId, currentIndex) {
                if (currentIndex > 0) {
                    // target previous index of same team
                    self.targetIndex(currentTeamId, currentIndex - 1);
                }
                else {
                    // target first index of other team
                    var otherTeamId = Game.UnitEngine.opposingTeamId(currentTeamId);
                    self.targetIndex(otherTeamId, 0);
                }

            }

            // SHIFT-TAB or LEFT ARROW
            Game.Keyboard.registerKey([{keyCode: 9, shiftKey: true}, 37], function() {
                var index = Game.UnitEngine.indexOfUnit(self.selectedUnit());
                if (index === null) {
                    targetFirstAlly();
                }
                else {
                    if (self.selectedUnit().teamId === Game.Constants.teamIds.player) {
                        targetNextIndex(Game.Constants.teamIds.player, index);
                    }
                    else {
                        targetPreviousIndex(Game.Constants.teamIds.computer, index);
                    }
                }
            });

            // TAB or RIGHT ARROW
            Game.Keyboard.registerKey([9, 39], function() {
                var index = Game.UnitEngine.indexOfUnit(self.selectedUnit());
                if (index === null) {
                    targetFirstAlly();
                }
                else {
                    if (self.selectedUnit().teamId === Game.Constants.teamIds.player) {
                        targetPreviousIndex(Game.Constants.teamIds.player, index);
                    }
                    else {
                        targetNextIndex(Game.Constants.teamIds.computer, index);
                    }
                }
            });
        },


        loadTeam: function(teamId) {
            var self = this;

            if (teamId === Game.Constants.teamIds.player) {
                this._allyFrames.forEach(function(frame) {
                    self._clearUnitFrame(frame);
                });
                this._allyIndices = {}; // Mapping of unit id -> array index of unit
                Game.UnitEngine.unitsForTeam(teamId).forEach(function(unit, index) {
                    self._allyIndices[unit.id] = index;
                    self._loadUnitFrame(unit);
                });

                this._loadDetailedFrame(this._playerFrame, Game.Player);
            }
            else {
                this._enemyFrames.forEach(function(frame) {
                    self._clearUnitFrame(frame);
                });
                this._enemyIndices = {}; // Mapping of unit id -> array index of unit
                Game.UnitEngine.unitsForTeam(teamId).forEach(function(unit, index) {
                    self._enemyIndices[unit.id] = index;
                    self._loadUnitFrame(unit);
                });

                this._loadDetailedFrame(this._targetFrame, this.selectedUnit());
            }

            this.updateCombatStatus();
        },

        _loadUnitFrame: function(unit) {
            var self = this;

            var frame = this._getUnitFrame(unit);

            this._clearUnitFrame(frame);

            // TODO name?
            //frame.$portrait.html(unit.name);

            // load existing effects:
            this._removeAllEffectsInFrame(frame);
            Game.Util.iterateObject(unit.effects(), function(effectId, effect) {
                self._addEffectToFrame(frame, effect);
            });

            // set frame width
            frame.$frame.css('width', (unit.animations.width / FRAME_COLUMNS * 100) + '%');

            this._refreshUnitFrame(unit);

            frame.$frame.visible();
        },
        _clearUnitFrame: function(frame) {
            frame.$frame.invisible();
            frame.$frame.css('width', '0%');

            this._removeAllEffectsInFrame(frame);

            // todo stop updates
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

            var frame = this._getUnitFrame(unit);

            // image (only draw if it has changed)
            var newImage = unit.image();
            if (newImage !== frame.lastImage) {
                this._paintImage(newImage, frame.$unitImage, unit.imageOffset(), '#ddd');
                frame.lastImage = newImage;
            }

            // refresh animations
            Game.Util.iterateObject(frame.effects, function(effectId, effectUi) {
                var newImage = effectUi.effect.image();
                if (newImage && newImage !== effectUi.lastImage) {
                    self._paintImage(newImage, effectUi.$animation, 0, effectUi.effect.imageColor());
                    effectUi.lastImage = newImage;
                }
            });

            var healthPercent = unit.percentHealth() + '%';
            frame.$healthBarProgress.css('width', healthPercent);
            frame.$healthBarText.html(Game.Util.round(unit.health) + '/' + Game.Util.round(unit.maxHealth.value()));

            if (unit.totalAbsorb() > 0) {
                var shieldPercent = Game.Util.roundForComparison((unit.health + unit.totalAbsorb()) / unit.maxHealth.value()) * 100 + '%';
                frame.$healthBarShield.css('width', shieldPercent).addClass('active');
            }
            else {
                frame.$healthBarShield.css('width', 0).removeClass('active');
            }
        },

        _paintImage: function(image, $pre, offset, color) {
            $pre.empty();

            $pre.css('color', color);

            image.forEach(function(imageRow) {
                var offsetSpaces = ' '.repeat(offset);
                $('<span>'+offsetSpaces+imageRow+'</span><br>').appendTo($pre);
            });
        },

        createFloatingText: function(unit, text, textClass) {
            var frame = this._getUnitFrame(unit);

            // If two combat texts are shown (for the same unit) within the COMBAT_TEXT_OFFSET_WINDOW, offset one to the side
            var oldOffsetData = frame.combatTextOffsets;
            var now = Date.now() || (new Date).getTime();
            var offsetLevel = 1;
            if (oldOffsetData && oldOffsetData.offsetLevel < COMBAT_TEXT_COLUMNS && (now - oldOffsetData.time < COMBAT_TEXT_OFFSET_WINDOW)) {
                offsetLevel = oldOffsetData.offsetLevel + 1;
            }

            frame.combatTextOffsets = {
                time: now,
                offsetLevel: offsetLevel
            };

            var $text = $('<span class="combat-text ' + textClass + ' ' + ('offset-'+offsetLevel) + '">' + text + '</span>').appendTo(frame.$combatTextArea);
            window.setTimeout(function() {
                $text.remove();
            }, COMBAT_TEXT_DURATION);
        },





        // ----------------------------------------------------- Targeting

        selectedUnit: function() {
            return this._targetedUnit;
        },

        targetedUnit: function() {
            return this._targetedUnitOverride ? this._targetedUnitOverride : this.selectedUnit();
        },

        clearTarget: function() {
            this._targetedUnit = null;
            $('.clickable-area').removeClass('targeted');

            this._clearDetailedFrame(this._targetFrame);

            this._refreshAbilityTargets();
        },

        targetUnit: function(unit) {
            // Remove targeting circle from any old target. Note: Not calling clearTarget for small performance gain
            this._targetedUnit = unit;
            $('.clickable-area').removeClass('targeted');

            // Add targeting circle to new target
            this._getUnitFrame(unit).$clickableArea.addClass('targeted');

            this._loadDetailedFrame(this._targetFrame, unit);

            this._refreshAbilityTargets();
        },

        targetIndex: function(teamId, index) {
            this.targetUnit(Game.UnitEngine.unitsForTeam(teamId)[index]);
        },

        // Targets a unit but doesn't show the white targeting circle around the unit in the UI. Used for things like alt-self-casting.
        overrideTargetUnit: function(unit) {
            this._targetedUnitOverride = unit;
            this._refreshAbilityTargets();
        },

        clearTargetOverride: function() {
            this._targetedUnitOverride = null;
            this._refreshAbilityTargets();
        },

        unitDied: function(unit) {
            this._refreshAbilityTargets();
        },







        // ----------------------------------------------------- Level UI

        _initLevelUI: function() {
            this._$navigationPanel = $('#navigation-panel');
            this._$engageCombat = this._$navigationPanel.find('#engage-combat');
            this._$nextRoom = this._$navigationPanel.find('#next-room');
            this._$engageCombat.off('click').on('click', function(evt) {
                evt.preventDefault();
                Game.UnitEngine.enterCombat();
            });

            this._$navigationPanel.find('.restart').off('click').on('click', function(evt) {
                location.reload();
            });

            this._$nextRoom.off('click').on('click', function(evt) {
                evt.preventDefault();
                Game.Levels.currentLevel.loadRandomEnemyRoom();
            })

        },

        updateCombatStatus: function() {
            this._$engageCombat.prop('disabled', Game.UnitEngine.inCombat() || !Game.UnitEngine.isComputerTeamAlive());
            this._$nextRoom.toggleClass('invisible', Game.UnitEngine.isComputerTeamAlive());

            if (!Game.UnitEngine.isPlayerTeamAlive()) {
                this._$navigationPanel.find('.normal-navigation').hide();
                $('.game-over').show();
            }
        },

        newRoomLoaded: function(room) {
            var level = Game.Levels.currentLevel;
            $('#level-info').html(level.name + '&emsp;&mdash;&emsp; Room ' + level.currentRoomIndex() + ' / ' + level.numRooms);

            $('#room-info').html(room.description);

        },






        // ----------------------------------------------------- Effects

        _initEffects: function() {
            // Effect id -> effectUi object containing jquery / CooldownTimer references
            this._playerEffects = {};
            this._targetEffects = {};
            this._unitEffects = {};
        },

        addEffect: function(unit, effect) {
            this._addEffectToFrame(this._getUnitFrame(unit), effect);

            if (this.selectedUnit() && unit.id === this.selectedUnit().id) {
                this._addEffectToFrame(this._targetFrame, effect);
            }
            if (unit.id === Game.Player.id) {
                this._addEffectToFrame(this._playerFrame, effect);
            }
        },

        removeEffect: function(unit, effect) {
            this._removeEffectFromFrame(this._getUnitFrame(unit), effect);

            if (this.selectedUnit() && unit.id === this.selectedUnit().id) {
                this._removeEffectFromFrame(this._targetFrame, effect);
            }
            if (unit.id === Game.Player.id) {
                this._removeEffectFromFrame(this._playerFrame, effect);
            }
        },

        // Refresh an existing effect so it stays in the same place (won't jump to end of $effectsArea)
        refreshEffect: function(unit, oldEffect, newEffect) {
            this._refreshEffectInFrame(this._getUnitFrame(unit), oldEffect, newEffect);

            if (this.selectedUnit() && unit.id === this.selectedUnit().id) {
                this._refreshEffectInFrame(this._targetFrame, oldEffect, newEffect);
            }
            if (unit.id === Game.Player.id) {
                this._refreshEffectInFrame(this._playerFrame, oldEffect, newEffect);
            }
        },

        _addEffectToFrame: function(frame, effect) {
            // Unit may not have been loaded into UI yet. That's okay, when it is its effects will be loaded
            if (!frame) {
                return;
            }

            var $effectsArea = frame.$effectsArea;

            var $effect = $('<div></div>', {
                class: 'effect ' + effect.icon + ' ' + effect.background + ' ' + (effect.hidden ? 'hidden' : '')
            }).appendTo($effectsArea);

            $effect.appendTo($effectsArea);

            $('<canvas></canvas>', {
                class: 'cooldown-status'
            }).appendTo($effect);

            var timer = new CooldownTimer($effect, frame.frameType + '_effect_'+effect.id, true);

            if (effect.hasDuration) {
                var totalCooldown = effect.duration.value();
                var elapsed = totalCooldown - effect.durationLeft();
                timer.startCooldown(totalCooldown, elapsed);
            }

            var effectUi = {
                effect: effect,
                $effect: $effect,
                timer: timer
            };
            if (frame.frameType === 'unit') {
                var $animation = $('<pre></pre>');
                $animation.appendTo(frame.$image);
                effectUi.$animation = $animation;
            }
            frame.effects[effect.id] = effectUi;
        },

        _removeEffectFromFrame: function(frame, effect) {
            var effects = frame.effects;
            this._removeEffectUi(effects[effect.id]);
            delete effects[effect.id];
        },

        _removeAllEffectsInFrame: function(frame) {
            var self = this;

            var effects = frame.effects;
            Game.Util.iterateObject(effects, function(effectId, effectUi) {
                self._removeEffectUi(effectUi);
                delete effects[effectId];
            });
        },

        _removeEffectUi: function(effectUi) {
            effectUi.timer.destroy();
            effectUi.$effect.remove();
            if (effectUi.$animation) {
                effectUi.$animation.remove();
            }
        },

        _refreshEffectInFrame: function(frame, oldEffect, newEffect) {
            var effects = frame.effects;

            effects[newEffect.id] = effects[oldEffect.id];
            delete effects[oldEffect.id];

            if (newEffect.hasDuration) {
                var totalCooldown = newEffect.duration.value();
                var elapsed = totalCooldown - newEffect.durationLeft();
                effects[newEffect.id].timer.startCooldown(totalCooldown, elapsed);
            }
        },






        // ----------------------------------------------------- Ability Bar

        _initAbilityBar: function() {
            var self = this;

            this._$abilityBar = $('#ability-bar');
            this._$abilityButtonTemplate = $('#ability-button-template');

            for (var i = 0; i < Game.Constants.numPlayerAbilities; i++) {
                var $button = this._createAbilityButton(i);
                $button.appendTo(this._$abilityBar);
            }

            this._abilityButtons = {}; // ability -> { $button: $button, timer: CooldownTimer, ability: ability }

            // Esc key (cancel cast)
            Game.Keyboard.registerKey(27, function() {
                if (Game.Player.isCasting()) {
                    Game.Player.cancelCast('Interrupted');
                }
                else {
                    self.clearTarget();
                }
            });

            // alt key (self cast modifier)
            Game.Keyboard.registerKey(18, function() {
                // With this here we can immediately update ability target requirements as soon as alt is pressed
                self.overrideTargetUnit(Game.Player);
            }, function() {
                // Note: Can't depend on catching this (e.g. hold alt then switch to another window)
                //       So we also clear override if altKey is not pressed during actual ability click
                self.clearTargetOverride();
            });

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

            this._initAbilitiesPage();
        },

        _createAbilityButton: function(index) {
            var $button = this._$abilityButtonTemplate.clone();
            $button.removeAttr('id');

            $button.find('.hotkey').html(index + 1);

            return $button;
        },

        equipAbility: function(ability, index) {
            this._assignAbilityToBar(ability, index);
            this._assignAbilityToEqBar(ability, index);
        },

        _assignAbilityToBar: function(ability, index) {
            var self = this;

            // Note: At this point the $button should be a blank button (the previous ability should have been removed)
            var $button = this._$abilityBar.find('.action-bar-button:not(#ability-button-template):eq('+(index)+')');

            $button.removeClass('blank');
            $button.addClass(ability.icon);
            $button.addClass(ability.background);
            $button.find('.name').html(ability.name);

            this._abilityButtons[ability.id] = {
                index: index,
                $button: $button,
                ability: ability,
                timer: new CooldownTimer($button, 'Ability_'+ability.id)
            };

            // Cast the ability, taking the mouse/button evt into account
            function castAbilityWithEvt(evt) {
                if (self._targetedUnitOverride && !evt.altKey) {
                    self.clearTargetOverride(); // Backup catch - in case alt key was released in other window
                }
                Game.Player.castAbility(ability, self.targetedUnit());
            }

            var keyCode = this._keyCodeForAbilityIndex(index);
            if (keyCode !== null) {
                Game.Keyboard.registerKey(keyCode, function(evt) {
                    castAbilityWithEvt(evt);
                    self._toggleButtonPressed($button, true);
                }, function(evt) {
                    self._toggleButtonPressed($button, false);
                });
            }

            $button.off('click').on('click', function(evt) {
                castAbilityWithEvt(evt);
            });
            // TODO _toggleButtonPressed on mousedown/mouseup (like keyboard)... but mouseup isn't called if you drag off the button

            $button.off('mouseenter').on('mouseenter', function(evt) {
                self._showAbilityTooltip(ability);
            });
            $button.off('mouseleave').on('mouseleave', function(evt) {
                self._hideAbilityTooltip();
            });
        },

        unequipAbility: function(ability, index) {
            this._removeAbilityFromBar(ability, index);
            this._removeAbilityFromEqBar(ability, index);
        },

        _removeAbilityFromBar: function(ability, index) {
            var buttonData = this._abilityButtons[ability.id];
            buttonData.timer.destroy();

            var $newButton = this._createAbilityButton(index);
            var $oldButton = this._$abilityBar.find('.action-bar-button:not(#ability-button-template):eq('+(index)+')');
            $oldButton.replaceWith($newButton);

            delete this._abilityButtons[ability.id];
        },

        startCooldown: function(ability, totalCooldown, elapsed) {
            this._abilityButtons[ability.id].timer.startCooldown(totalCooldown, elapsed);
        },

        // Note: ability cooldown timers are handled separately
        _refreshAbilityBar: function() {
            var self = this;

            // refreshes if buttons disabled or not based on mana
            Game.Util.iterateObject(this._abilityButtons, function(abilityId, buttonData) {
                var ability = buttonData.ability;
                self._toggleAbilityManaReq(ability, !Game.Player.hasManaForAbility(ability));
            });
        },
        
        _refreshAbilityTargets: function() {
            var self = this;

            // refreshes if buttons are disabled or not based on target
            Game.Util.iterateObject(this._abilityButtons, function(abilityId, buttonData) {
                var ability = buttonData.ability;
                self._toggleAbilityTargetReq(ability, !ability.canTargetUnit(self.targetedUnit()));
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
            this._abilityButtons[ability.id].$button.toggleClass('casting', isCasting);
        },

        _toggleAbilityManaReq: function(ability, notEnoughMana) {
            this._abilityButtons[ability.id].$button.toggleClass('not-enough-mana', notEnoughMana);
        },

        _toggleAbilityTargetReq: function(ability, invalidTarget) {
            this._abilityButtons[ability.id].$button.toggleClass('invalid-target', invalidTarget);
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


        _initMap: function() {
            this._$mapModal = $('#map-modal');
            var world = new Game.Maps.Map('world');
            this._$mapModal.find('.ascii-content').html(world.display.join('\n'));
        },


        _initAbilitiesPage: function() {
            var self = this;

            this._$abilitiesModal = $('#abilities-modal');
            this._$equippedAbilities = $('#equipped-abilities');
            this._$equippedAbilityTemplate = $('#equipped-ability-template');
            this._$spellbook = $('#spellbook');
            this._$spellbookTbody = $('#spellbook-tbody');
            this._$spellbookRowTemplate = $('#spellbook-row-template');
            this._$spellbookAbilityTemplate = $('#spellbook-ability-template');
            this._$spellbookInstructions = this._$abilitiesModal.find('.instructions');

            for (var i = 0; i < Game.Constants.numPlayerAbilities; i++) {
                var $buttonContainer = this._createEqAbilityButton(i);
                $buttonContainer.appendTo(this._$equippedAbilities);
            }

            this._$abilitiesModal.off('open.zf.reveal').on('open.zf.reveal', function(evt) {
                console.log(evt);
                self._clearSpellbookPage();
                //self._showSpellbookPage(0);
            });

            this._currentSpellbookPage = 0;
            this._$spellbookPageLeft = this._$spellbook.find('.turn-page-left');
            this._$spellbookPageRight = this._$spellbook.find('.turn-page-right');
            this._$spellbookPageRight.off('click').on('click', function(evt) {
                evt.preventDefault();
                self._showSpellbookPage(self._currentSpellbookPage + 1);
            });
            this._$spellbookPageLeft.off('click').on('click', function(evt) {
                evt.preventDefault();
                self._showSpellbookPage(self._currentSpellbookPage - 1);
            });

            var $spellbookTooltip = $('#spellbook-tooltip');
            this._spellbookTooltip = {
                $tip: $spellbookTooltip,
                $name: $spellbookTooltip.find('.name'),
                $manaCost: $spellbookTooltip.find('.mana-cost'),
                $castTime: $spellbookTooltip.find('.cast-time'),
                $cooldown: $spellbookTooltip.find('.cooldown'),
                $description: $spellbookTooltip.find('.description')
            };
            $spellbookTooltip.off('mouseover').on('mouseover', function() {
                self._hideSpellbookTooltip();
            });


        },

        _clearSpellbookPage: function() {
            if ($.contains(this._$spellbookTbody.get(0), this._spellbookTooltip.$tip.get(0))) {
                this._spellbookTooltip.$tip.appendTo(this._$spellbook); // move tip out so it doesn't get removed
            }
            this._$spellbookTbody.find('tr:not(#spellbook-row-template)').remove();
            this._$spellbook.hide();
            this._$spellbookInstructions.show();
        },
        _showSpellbookPage: function(page) {
            var self = this;

            this._clearSpellbookPage();
            this._$spellbookInstructions.hide();
            this._$spellbook.show();
            this._$spellbook.find('.current-page').html('Page ' + (page + 1));
            this._currentSpellbookPage = page;

            var sortedAbilities = Object.values(Game.Player.abilities()).sort(function(a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });

            var spellsPerPage = SPELLBOOK_ROWS * SPELLBOOK_COLS;
            var startingIndex = page * spellsPerPage;
            var pageAbilities = sortedAbilities.slice(startingIndex, startingIndex + spellsPerPage);
            var numPages = Math.ceil(sortedAbilities.length / spellsPerPage);

            this._$spellbookPageLeft.attr('disabled', this._currentSpellbookPage === 0);
            this._$spellbookPageRight.attr('disabled', this._currentSpellbookPage >= (numPages - 1));

            var currentRow = 0;
            var currentCol = 0;
            var $currentRow = null;

            // TODO will this have same order every time?
            pageAbilities.forEach(function(ability) {
                if (currentCol === 0) {
                    // create row
                    $currentRow = self._$spellbookRowTemplate.clone();
                    $currentRow.removeAttr('id');
                    $currentRow.appendTo(self._$spellbookTbody);
                }

                // create cell
                var $buttonContainer = self._$spellbookAbilityTemplate.clone();
                $buttonContainer.removeAttr('id');
                $buttonContainer.css('width', (100 / SPELLBOOK_COLS) + '%');
                $buttonContainer.appendTo($currentRow);

                var $button = $buttonContainer.find('.action-bar-button');
                $button.removeClass('blank');
                $button.addClass(ability.icon);
                $button.addClass(ability.background);
                $buttonContainer.find('.name').html(ability.name);

                var $innerContainer = $buttonContainer.find('.button-container-inner');

                if (self._spellbookOriginalAbilityId === ability.id) {
                    $innerContainer.addClass('selected');
                }

                var colCopy = currentCol; // copy column to pass to tooltip later
                $innerContainer.off('mouseenter').on('mouseenter', function(evt) {
                    self._showSpellbookTooltip($(this), ability, colCopy, 'show-left');
                });
                $innerContainer.off('mouseleave').on('mouseleave', function(evt) {
                    self._hideSpellbookTooltip();
                });
                $innerContainer.off('click').on('click', function() {
                    // user has chosen the ability
                    Game.Player.equipAbility(ability, self._spellbookSelectingForIndex);
                    self._clearEqSelection();
                    self._clearSpellbookPage();
                });

                currentCol += 1;
                if (currentCol >= SPELLBOOK_COLS) {
                    currentCol = 0;
                    currentRow += 1;
                }
            });
        },

        _showSpellbookTooltip: function($element, ability, index, directionClass) {
            //var leftRightClass = 'centered';
            //if (index === 0) {
            //    leftRightClass = 'expand-right';
            //}
            //if (index === Game.Constants.numPlayerAbilities - 1) {
            //    leftRightClass = 'expand-left';
            //}

            this._spellbookTooltip.$name.html(ability.name);

            var manaCost = (ability.manaCost.value() === 0) ? '' : (Game.Util.round(ability.manaCost.value()) + ' Mana');
            this._spellbookTooltip.$manaCost.html(manaCost);

            var castTime = (ability.castTime.value() === 0) ? 'Instant' : (Game.Util.roundToDecimal(ability.castTime.value(), 2) + ' sec cast');
            this._spellbookTooltip.$castTime.html(castTime);

            var cooldown = (ability.cooldown.value() === 0) ? '' : (Game.Util.roundToDecimal(ability.cooldown.value(), 2) + ' sec cooldown');
            this._spellbookTooltip.$cooldown.html(cooldown);

            this._spellbookTooltip.$description.html(ability.description());

            this._spellbookTooltip.$tip
                .removeClass('show-left show-right')
                //.addClass(leftRightClass)
                .addClass(directionClass)
                .show()
                .appendTo($element);
        },
        _hideSpellbookTooltip: function() {
            this._spellbookTooltip.$tip.hide();
        },

        _createEqAbilityButton: function(index) {
            var self = this;

            var $buttonContainer = this._$equippedAbilityTemplate.clone();
            $buttonContainer.removeAttr('id');

            $buttonContainer.find('.hotkey').html(index + 1);

            //$buttonContainer.css('width', (100 / Game.Constants.numPlayerAbilities) + '%');

            var $innerContainer = $buttonContainer.find('.button-container-inner');
            $innerContainer.off('click').on('click', function(evt) {
                self._clearEqSelection();
                $(this).addClass('selected');
                self._spellbookSelectingForIndex = index;
                self._spellbookOriginalAbilityId = $buttonContainer.data('ability-id');

                // highlight matching thing, go to correct page?
                self._showSpellbookPage(0);
            });


            return $buttonContainer;
        },

        _assignAbilityToEqBar: function(ability, index) {
            var self = this;

            var $buttonContainer = this._$equippedAbilities.find('.button-container:not(#equipped-ability-template):eq('+(index)+')');
            var $button = $buttonContainer.find('.action-bar-button');

            $button.removeClass('blank');
            $button.addClass(ability.icon);
            $button.addClass(ability.background);
            $buttonContainer.find('.name').html(ability.name);

            var $innerContainer = $buttonContainer.find('.button-container-inner');

            $innerContainer.off('mouseenter').on('mouseenter', function(evt) {
                self._showSpellbookTooltip($(this), ability, index, 'show-right');
            });
            $innerContainer.off('mouseleave').on('mouseleave', function(evt) {
                self._hideSpellbookTooltip();
            });

            $buttonContainer.data('ability-id', ability.id); // store id for on click
        },

        _clearEqSelection: function() {
            this._$equippedAbilities.find('.selected').removeClass('selected');
            this._spellbookSelectingForIndex = null;
            this._spellbookOriginalAbilityId = null;
        },

        _removeAbilityFromEqBar: function(ability, index) {
            var $newButton = this._createEqAbilityButton(index);
            var $oldButton = this._$equippedAbilities.find('.button-container:not(#equipped-ability-template):eq('+(index)+')');
            $oldButton.replaceWith($newButton);
        },









        // ----------------------------------------------------- Player Bars (health/mana in bottom left)

        _initPlayerBars: function() {
            //var $health = $('#player-health');
            //this._playerHealth = {
            //    $progress: $health.find('.health'),
            //    $text: $health.find('.bar-text')
            //};

            var $mana = $('#player-mana');
            this._playerMana = {
                $progress: $mana.find('.mana'),
                $text: $mana.find('.bar-text')
            };
        },

        _refreshPlayerBars: function() {
            //var healthWidth = Game.Util.roundForComparison(Game.Player.health / Game.Player.maxHealth.value()) * 100 + '%';
            //this._playerHealth.$progress.css('width', healthWidth);
            //this._playerHealth.$text.html(Game.Util.round(Game.Player.health) + '/' + Game.Util.round(Game.Player.maxHealth.value()));

            var widthPercent = Game.Util.roundForComparison(Game.Player.mana / Game.Player.maxMana.value()) * 100 + '%';
            this._playerMana.$progress.css('width', widthPercent);
            this._playerMana.$text.html(Game.Util.round(Game.Player.mana) + '/' + Game.Util.round(Game.Player.maxMana.value()));
        },








        // ----------------------------------------------------- Cast bar

        _initCastBar: function() {
            var $castBar = $('#player-cast-bar');

            this._castBarFrame = {
                $castBar: $castBar,
                $castBarProgress: $castBar.find('.bar-layer.cast-progress'),
                $castBarText: $castBar.find('.bar-layer.bar-text')
            }
        },

        startCast: function(unit, ability) {
            var self = this;
            
            var castLength = ability.castTime.value();
            if (castLength !== 0) {
                // Has cast time; show cast bar, highlight ability if player
                this._startCastBar(unit, ability.name, castLength);
                if (unit.id === Game.Player.id) {
                    this._toggleAbilityCasting(ability, true);
                }
            }
            else {
                // Instant cast; briefly highlight ability if player even though it was instant cast
                if (unit.id === Game.Player.id) {
                    this._toggleAbilityCasting(ability, true);
                    window.setTimeout(function() {
                        self._toggleAbilityCasting(ability, false);
                    }, HIGHLIGHT_INSTANT_DURATION);
                }
            }
        },

        cancelCast: function(unit, ability, message) {
            this._cancelCastBar(unit, message);
            if (unit.id === Game.Player.id) {
                this._toggleAbilityCasting(ability, false);
            }
        },

        finishCast: function(unit, ability) {
            this._completeCastBar(unit);
            if (unit.id === Game.Player.id) {
                this._toggleAbilityCasting(ability, false);
            }
        },

        _startCastBar: function(unit, text, castLength) {
            var self = this;

            function startCastBar(frame) {
                // Set up a temporary interval for the cast bar that updates at a very high framerate
                var accumulatedSeconds = 0;
                Game.Clock.setInterval(self._castBarClockKey(unit, frame), function (iterations, period) {
                    accumulatedSeconds += iterations * period;
                    frame.$castBarProgress.css('width', (accumulatedSeconds / castLength) * 100 + '%');
                }, 1.0 / CAST_BAR_UPDATES_PER_SECOND);

                frame.$castBarProgress.css('width', '0%')
                    .removeClass('casting cast-complete cast-canceled')
                    .addClass('casting');
                frame.$castBarText.html(text);
                frame.$castBar.stop(); // stop any fade out animations (from completes/cancels right before)
                //frame.$castBar.fadeIn(0);
                frame.$castBar.animate({opacity: 1}, 0);
            }

            if (unit.id === Game.Player.id) {
                startCastBar(this._castBarFrame);
            }
            else {
                startCastBar(this._getUnitFrame(unit));
            }
        },

        _completeCastBar: function(unit) {
            var self = this;

            function completeCastBar(frame) {
                Game.Clock.clearInterval(self._castBarClockKey(unit, frame));

                frame.$castBarProgress.css('width', '100%')
                    .removeClass('casting cast-complete cast-canceled')
                    .addClass('cast-complete');
                //frame.$castBar.fadeOut(500);
                frame.$castBar.animate({ opacity: 0 }, 500);
            }

            if (unit.id === Game.Player.id) {
                completeCastBar(this._castBarFrame);
            }
            else {
                completeCastBar(this._getUnitFrame(unit));
            }
        },

        _cancelCastBar: function(unit, message) {
            var self = this;

            function cancelCastBar(frame) {
                Game.Clock.clearInterval(self._castBarClockKey(unit, frame));

                frame.$castBarProgress.css('width', '100%')
                    .removeClass('casting cast-complete cast-canceled')
                    .addClass('cast-canceled');
                frame.$castBarText.html(Game.Util.defaultFor(message, 'Failed'));
                //frame.$castBar.fadeOut(500);
                frame.$castBar.animate({ opacity: 0 }, 500);
            }

            if (unit.id === Game.Player.id) {
                cancelCastBar(this._castBarFrame);
            }
            else {
                cancelCastBar(this._getUnitFrame(unit));
            }
        },

        _castBarClockKey: function(unit, frame) {
            return CAST_BAR_CLOCK_KEY + '_' + unit.id + '_' + frame.frameType;
        }

    };

    Game.UserInterface = new UserInterface();




    /*
     CooldownTimer class:

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

        destroy: function() {
            Game.Clock.clearInterval(this.clockKey);
            // todo this.$container.remove() ?
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
