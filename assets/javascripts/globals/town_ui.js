/* TownUI is a Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 1;
    var CLOCK_KEY = 'TownUI';


    var TownUI = function() {};

    TownUI.prototype = {
        init: function() {
            var self = this;

            this.$gold = $('#gold-value');
            this.$popupContainer = $('#popup-container');
            this.$buildingPopup = $('#building-popup');
            this.$returnToTown = $('#return-to-town');

            this._setupReturnToTown();

            Game.Timers.addTimerSupport(this);

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                // Only draw once (no matter how many iterations)
                self._refreshUI();

                self.updateTimers(iterations * period);
            }, 1.0 / UPDATES_PER_SECOND);

        },

        _refreshUI: function() {
            this.$gold.html(Game.ResourceEngine.getAmount('gold'));
        },

        loadTown: function() {
            var self = this;

            Game.UnitEngine.stopEngine();
            Game.CombatUI.closeUI();

            Game.BackgroundUI.drawBackground('town');
            Game.BackgroundUI.setZoneName('The Village');

            // Register handlers:
            this.$popupContainer.off('click', '.close-popup').on('click', '.close-popup', function(evt) {
                evt.preventDefault();

                $(this).closest('.ui-popup').hide();
            });

            Game.BackgroundUI.registerHandler('village.gate', function() {
                self.closeAllPopups();
                Game.WorldMapUI.openMap();
            });

            Game.BackgroundUI.registerHandler('village.blacksmith', function() {
                self._openBlacksmith();
            });

        },

        closeAllPopups: function() {
            this.$popupContainer.find('.ui-popup').hide();
        },

        _openBlacksmith: function() {
            this.$buildingPopup.find('.popup-title').html('Blacksmith');

            this._clearItemList();

            this._listItem({
                icon: 'sword-brandish',
                name: 'Short Sword',
                cost: '15 gold, 3 bronze bars',

                learned: true,
                purchase: 'Craft'
            });
            this._listItem({
                icon: 'viking-shield',
                name: 'Small Shield',
                cost: '10 gold, 1 bronze bar',

                learned: false,
                requirements: 'Req. level 45'
            });

            this.$buildingPopup.show();
        },

        _clearItemList: function() {
            this.$buildingPopup.find('.item-list').empty();
        },
        _listItem: function(item) {
            var $template = $('#item-template').find('.item');

            var $item = $template.clone();
            $item.find('.item-icon').addClass(item.icon);
            $item.find('.item-name').html(item.name);
            $item.find('.item-cost').html(item.cost);

            $item.toggleClass('unlearned', !item.learned);
            $item.find('.item-requirements').toggle(!item.learned).html(item.requirements);
            $item.find('.item-purchase').toggle(!!item.learned).html(item.purchase);

            this.$buildingPopup.find('.item-list').append($item);
        },

        toggleReturnToTown: function(show) {
            this.$returnToTown.toggle(show);
        },

        _setupReturnToTown: function() {
            var self = this;

            this.$returnToTown.find('.go-to-village').off('click').on('click', function(evt) {
                evt.preventDefault();
                self.toggleReturnToTown(false);
                self.loadTown();
            })
        }

    };

    Game.TownUI = new TownUI();


}(jQuery));
