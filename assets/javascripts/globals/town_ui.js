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
                self._startQuest();
            });

            Game.BackgroundUI.registerHandler('village.blacksmith', function() {
                self._openBlacksmith();
            });

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

        // TODO Move this somewhere else
        _startQuest: function() {
            Game.TeamBuilderUI.openTeamSelector();

            //// -------- Background
            //Game.BackgroundUI.drawBackground('woods');
            //
            //// -------- UnitEngine
            //Game.UnitEngine.loadEngine();
            //
            //var crusader = new Game.Units.Unit('crusader', {teamId: Game.Constants.teamIds.player});
            //Game.UnitEngine.addUnit(crusader);
            //crusader.equipAbility('special', new Game.Abilities.Ability('blessedShield'));
            //
            //var brewmaster = new Game.Units.Unit('brewmaster', {teamId: Game.Constants.teamIds.player});
            //Game.UnitEngine.addUnit(brewmaster);
            //brewmaster.equipAbility('special', new Game.Abilities.Ability('backstab'));
            //
            //var swashbuckler = new Game.Units.Unit('swashbuckler', {teamId: Game.Constants.teamIds.player});
            //Game.UnitEngine.addUnit(swashbuckler);
            //swashbuckler.equipAbility('special', new Game.Abilities.Ability('backstab'));
            //
            //var smuggler = new Game.Units.Unit('smuggler', {teamId: Game.Constants.teamIds.player});
            //Game.UnitEngine.addUnit(smuggler);
            //smuggler.equipAbility('special', new Game.Abilities.Ability('backstab'));
            //
            //var cleric = new Game.Units.Unit('cleric', { teamId: Game.Constants.teamIds.player });
            //Game.UnitEngine.addUnit(cleric);
            //cleric.equipAbility('special', new Game.Abilities.Ability('holyNova'));
            //
            //// -------- CombatUI
            //Game.CombatUI.loadUI();
        }


    };

    Game.TownUI = new TownUI();


}(jQuery));
