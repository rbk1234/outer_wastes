/* Spellbook is a Singleton */

(function($) {
    'use strict';

    var Spellbook = function() {};

    Spellbook.prototype = {
        init: function() {
            var self = this;

            this.$popupContainer = $('#popup-container');
            this.$spellbook = $('#spellbook');

            this._learnedSpells = [];
            //this._equippedSpells = [];

            $('#toggle-spellbook').off('click').on('click', function() {
                //Game.TownUI.closeAllPopups();
                self.toggleSpellbook();
            });

            this.refreshUI();
        },

        saveData: function() {
            var self = this;

            var state = {
                learnedSpells: this._learnedSpells,
                //equippedSpells: this._equippedSpells
            };

            return state;
        },

        loadData: function(data) {
            var self = this;

            if (data === undefined) {
                return;
            }

            this._learnedSpells = data.learnedSpells;
            //this._equippedSpells = data.equippedSpells;

            this.refreshUI();
        },

        // refresh all UI according to current state
        // Note: This will RELEARN spells (so existing cooldowns will go away)
        refreshUI: function() {
            //$('.spellbook-unlocked').toggle(this._learnedSpells.length > 0);

            this._learnedSpells.forEach(function(dbKey, index) {
                Game.Player.equipAbility(index, new Game.Abilities.Ability(dbKey));
            });

            this._setupSpellbook();
        },

        learnSpell: function(dbKey) {
            this._learnedSpells.push(dbKey);

            this.refreshUI();
        },

        shouldShowSpellbar: function() {
            return this._learnedSpells.length > 0;
        },

        _setupSpellbook: function() {

        },

        toggleSpellbook: function(show) {

        }
    };

    Game.Spellbook = new Spellbook();


}(jQuery));
