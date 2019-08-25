/* InventoryUI is a Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 1;
    var CLOCK_KEY = 'InventoryUI';

    var InventoryUI = function() {};

    InventoryUI.prototype = {
        init: function() {
            var self = this;

            this.$inventory = $('#inventory');
            this.unlocked = false;

            this._setupToggle();

            this.refreshUI();
        },

        saveData: function() {
            //var self = this;

            return {
                unlocked: this.unlocked
            };
        },

        loadData: function(data) {
            var self = this;

            if (data === undefined) {
                return;
            }

            this.unlocked = data.unlocked;

            this.refreshUI();
        },

        _setupToggle: function() {
            var self = this;

            $('#toggle-inventory').off('click').on('click', function(evt) {
                evt.preventDefault();

                if (self.$inventory.is(':visible')) {
                    self.close();
                }
                else {
                    self.open();
                }
            });
        },

        refreshUI: function() {
            $('.inventory-unlocked').toggle(!!this.unlocked);
        },

        unlock: function() {
            this.unlocked = true;
            this.refreshUI();
        },

        open: function() {
            var self = this;

            this.$inventory.show();
        },

        closeMap: function() {

            this.$inventory.hide();
        },



    };

    Game.InventoryUI = new InventoryUI();


}(jQuery));
