/* PartyUI is a Singleton */

(function($) {
    'use strict';

    var MAX_PARTY_SIZE = 5; // Note: Don't change this without updating UnitEngine too
    var MAX_FOLLOWERS = MAX_PARTY_SIZE - 1;

    var PartyUI = function() {};

    PartyUI.prototype = {
        init: function() {
            var self = this;

            this._roster = []; // all units available to the player
            this._followers = Game.Util.createArray(MAX_FOLLOWERS, null);

            this.$popupContainer = $('#popup-container');
            this.$partySelector = $('#party-selector');

            $('#toggle-party').off('click').on('click', function() {
                //Game.TownUI.closeAllPopups();
                self.togglePartySelector();
            });

            this.refreshUI();
        },

        _numFollowerSlots: function() {
            return Math.min(this._roster.length, MAX_FOLLOWERS);
        },

        saveData: function() {
            var self = this;

            var state = {
                roster: this._roster.map(function(unit) {
                    return {
                        dbKey: unit.dbKey,
                        followerIndex: self._followerIndex(unit.id)
                    };
                })
            };

            return state;
        },

        loadData: function(data) {
            var self = this;

            if (data === undefined) {
                return;
            }
            //console.log('loadData: ',data);

            data.roster.forEach(function(rosterData) {
                var unit = new Game.Units.Unit(rosterData.dbKey, {teamId: Game.Constants.teamIds.player});

                if (rosterData.followerIndex != -1) {
                    self._followers[rosterData.followerIndex] = unit;
                }

                self.addToRoster(unit);
            });

            this.refreshUI();
        },

        // refresh all UI according to current state
        refreshUI: function() {
            $('.party-unlocked').toggle(this._roster.length > 0);

            this._setupPartySelector();
        },

        addToRoster: function(unit) {
            //var unit = new Game.Units.Unit(unitDbKey, {teamId: Game.Constants.teamIds.player});
            this._roster.push(unit);

            this._equipSpecialAbility(unit);

            this.refreshUI();
        },

        _rosterUnit: function(id) {
            var matchingUnit = this._roster.filter(function(unit) {
                return unit.id === id;
            })[0];

            return matchingUnit || null;
        },
        _followerIndex: function(id) {
            var ids = this._followers.map(function(unit) {
                return unit ? unit.id : null;
            });
            return ids.indexOf(id);
        },

        _setupPartySelector: function() {
            var self = this;

            var $tr = this.$partySelector.find('.party-table').find('tr');
            $tr.empty();

            var i, slot;
            this._partySlots = [];

            // create follower slots
            for (i = 0; i < this._numFollowerSlots(); i++) {
                slot = this._createPartySlot($tr, i);
                self._setupFollowerSelector(i);
            }

            // create player slot
            slot = this._createPartySlot($tr, i);
            $('<div></div>', {
                class: 'static-unit-name',
                html: Game.Player.name
            }).appendTo(slot.$td);
            var $stats = $('<div></div>', {
                class: 'unit-stats'
            }).appendTo(slot.$td);
            Game.Util.paintImage(Game.Player.animations.idle.image, slot.$image, Game.Player.imageOffset());
            self._displayUnitStats(Game.Player, $stats);
            i++;

            // create locked slots
            for (i; i < MAX_PARTY_SIZE; i++) {
                slot = this._createPartySlot($tr, i);
                Game.Util.paintImage(['   LOCKED', '', '', ''], slot.$image);
            }
        },

        _createPartySlot: function($tr, i) {
            var $td = $('<td></td>', {
                width: (100 / MAX_PARTY_SIZE) + '%'
            }).prependTo($tr);

            this._appendTitle(i, $td);
            var $partySlot = $('<div></div>', {
                class: 'party-slot'
            }).appendTo($td);
            var $image = $('<div></div>', {
                class: 'ascii-content'
            }).appendTo($partySlot);

            this._partySlots[i] = {
                $td: $td,
                $partySlot: $partySlot,
                $image: $image
            };

            return this._partySlots[i];
        },

        _setupFollowerSelector: function(i) {
            var self = this;

            var slot = this._partySlots[i];

            var $select = $('<select></select>', {
                class: 'unit-select'
            }).appendTo(slot.$td);

            $('<option></option>', {
                html: 'None',
                value: ''
            }).appendTo($select);

            // todo sort by name
            this._roster.forEach(function(unit) {
                $('<option></option>', {
                    html: unit.name,
                    value: unit.id
                }).appendTo($select);
            });

            var $stats = $('<div></div>', {
                class: 'unit-stats'
            }).appendTo(slot.$td);

            $select.off('change').on('change', function() {
                var unit = self._rosterUnit(parseInt($(this).val()));

                if (unit) {
                    // if unit was in a different slot, empty that slot
                    var oldIndex = self._followerIndex(unit.id);
                    if (oldIndex !== -1 && oldIndex !== i) {
                        self._partySlots[oldIndex].$select.val('').trigger('change');
                    }

                    Game.Util.paintImage(unit.animations.idle.image, slot.$image, unit.imageOffset());
                    self._displayUnitStats(unit, $stats);
                }
                else {
                    Game.Util.paintImage(['    ', '', '', ''], slot.$image);
                    self._displayUnitStats(null, $stats);
                }

                self._followers[i] = unit;
            }).val(this._followers[i] ? this._followers[i].id : '').trigger('change'); // initial value

            slot.$select = $select;
        },

        currentParty: function() {
            // get rid of empty slots
            var party = this._followers.filter(function(unit) {
                return !!unit;
            });

            // append Player
            party.push(Game.Player);

            return party;
        },

        _appendTitle: function(i, $td) {
            if (i === 0) {
                $('<div></div>', {
                    html: 'Frontline',
                    class: 'slot-title text-right'
                }).appendTo($td);
            }
            else if(i === MAX_PARTY_SIZE - 1) {
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

        _displayUnitStats: function(unit, $stats) {
            $stats.empty();

            if (unit) {
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
            }
        },

        togglePartySelector: function() {
            this.$partySelector.toggle();
        },

        _equipSpecialAbility: function(unit) {
            // todo let player pick ability... for now just assigns it

            var abilityKey;

            switch(unit.dbKey) {
                case 'swashbuckler':
                    abilityKey = 'backstab';
                    break;
                case 'brewmaster':
                    abilityKey = 'backstab';
                    break;
                case 'cleric':
                    abilityKey = 'holyLight';
                    break;
                case 'smuggler':
                    abilityKey = 'backstab';
                    break;
                case 'crusader':
                    abilityKey = 'backstab';
                    break;
                default:
                    console.warn('No ability for unit: '+unit.dbKey);
            }

            unit.equipAbility('special', new Game.Abilities.Ability(abilityKey));
        }

    };

    Game.PartyUI = new PartyUI();


}(jQuery));
