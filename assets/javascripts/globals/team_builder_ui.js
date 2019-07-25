/* TeamBuilderUI is a Singleton */

(function($) {
    'use strict';

    //var UPDATES_PER_SECOND = 1;
    //var CLOCK_KEY = 'TeamBuilderUI';

    var MAX_TEAM_SIZE = 5; // note: don't change this without updating UnitEngine too

    var TeamBuilderUI = function() {};

    TeamBuilderUI.prototype = {
        init: function() {
            var self = this;

            this.$popupContainer = $('#popup-container');
            this.$teamSelector = $('#team-selector');

            this.setupTeamSelector();

            //Game.Timers.addTimerSupport(this);
            //
            // Start clock
            //Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
            //    // Only draw once (no matter how many iterations)
            //    self._refreshUI();
            //
            //    self.updateTimers(iterations * period);
            //}, 1.0 / UPDATES_PER_SECOND);

        },

        // TODO Call this after new classes unlocked?
        setupTeamSelector: function() {
            var self = this;

            this.unitFrames = [];
            this.units = [];

            var $tr = this.$teamSelector.find('.team-table').find('tr');
            $tr.empty();

            var UNLOCKED_CLASSES = ['swashbuckler', 'brewmaster', 'cleric'];
            var AVAILABLE_SLOTS = 5;

            for (var i = 0; i < MAX_TEAM_SIZE; i++) {
                var $td = $('<td></td>', {
                    width: (100 / MAX_TEAM_SIZE) + '%'
                }).prependTo($tr);

                this._appendTitle(i, $td);
                var $partySlot = $('<div></div>', {
                    class: 'party-slot'
                }).appendTo($td);
                var $image = $('<div></div>', {
                    class: 'ascii-content'
                }).appendTo($partySlot);

                if (i < AVAILABLE_SLOTS) {
                    var $select = $('<select></select>', {
                        class: 'unit-select'
                    }).appendTo($td);

                    UNLOCKED_CLASSES.forEach(function(klass) {
                        var dbRecord = Game.Units.Database[klass];
                        $('<option></option>', {
                            html: dbRecord.name,
                            value: klass
                        }).appendTo($select);
                    });

                    var $stats = $('<div></div>', {
                        class: 'unit-stats'
                    }).appendTo($td);

                    this.unitFrames.push({
                        $image: $image,
                        $select: $select,
                        $stats: $stats
                    });

                    this._setupUnitSelect(i);
                }
                else {
                    Game.Util.paintImage(['   LOCKED', '', '', ''], $image);
                }
            }

            this.$teamSelector.find('#start-quest').off('click').on('click', function(evt) {
                evt.preventDefault();
                self._startQuest();
            });
        },

        _appendTitle: function(i, $td) {
            if (i === 0) {
                $('<div></div>', {
                    html: 'Frontline',
                    class: 'slot-title text-right'
                }).appendTo($td);
            }
            else if(i === MAX_TEAM_SIZE - 1) {
                $('<div></div>', {
                    html: 'Backline',
                    class: 'slot-title text-left'
                }).appendTo($td);
            }
            else {
                $('<div></div>', {
                    html: '&nbsp;',
                    class: 'slot-title'
                }).appendTo($td);

            }
        },

        _setupUnitSelect: function(i) {
            var self = this;
            var frame = this.unitFrames[i];

            frame.$select.off('change').on('change', function() {
                var unit = new Game.Units.Unit($(this).val(), {teamId: Game.Constants.teamIds.player});
                self.units[i] = unit;

                Game.Util.paintImage(unit.animations.idle.image, frame.$image, unit.imageOffset());
                self._displayUnitStats(unit, frame.$stats);
            }).trigger('change');
        },

        _displayUnitStats: function(unit, $stats) {
            $stats.empty();
            $('<div></div>', {
                html: 'HP: ' + unit.maxHealth.value()
            }).appendTo($stats);
            $('<div></div>', {
                html: 'ATK: ' + unit.attackDamage.value()
            }).appendTo($stats);
            $('<div></div>', {
                html: 'SPD: ' + unit.attackSpeed.value()
            }).appendTo($stats);
            $('<div></div>', {
                html: 'DPS: ' + (unit.attackDamage.value() * unit.attackSpeed.value())
            }).appendTo($stats);
        },

        openTeamSelector: function() {
            this.$teamSelector.show();
        },
        closeTeamSelector: function() {
            this.$teamSelector.hide();
        },

        _startQuest: function() {
            var self = this;

            this.closeTeamSelector();

            // -------- Background
            Game.BackgroundUI.drawBackground('woods');

            // -------- UnitEngine
            Game.UnitEngine.loadEngine();

            this.units.forEach(function(unit) {
                self._equipAbility(unit);
                Game.UnitEngine.addUnit(unit);
            });

            // -------- CombatUI
            Game.CombatUI.loadUI();
        },

        _equipAbility: function(unit) {
            var abilityKey;

            switch(unit.dbKey) {
                case 'swashbuckler':
                    abilityKey = 'backstab';
                    break;
                case 'brewmaster':
                    abilityKey = 'backstab';
                    break;
                case 'cleric':
                    abilityKey = 'holyNova';
                    break;
                default:
                    console.warn('No ability for unit: '+unit.dbKey);
            }

            unit.equipAbility('special', new Game.Abilities.Ability(abilityKey));
        }

    };

    Game.TeamBuilderUI = new TeamBuilderUI();


}(jQuery));
