/* WorldMapUI is a Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 1;
    var CLOCK_KEY = 'WorldMapUI';


    var WorldMapUI = function() {};

    WorldMapUI.prototype = {
        init: function() {
            var self = this;

            Game.Timers.addTimerSupport(this);

            this.$map = $('#world-map');

            this.$map.find('#start-quest').off('click').on('click', function(evt) {
                evt.preventDefault();
                self._startQuest();
            });

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {

                self.updateTimers(iterations * period);
            }, 1.0 / UPDATES_PER_SECOND);

        },

        openMap: function() {
            this.$map.show();
        },

        closeMap: function() {
            this.$map.hide();
        },

        _startQuest: function() {
            this.closeMap();

            Game.UnitEngine.loadEngine();
            Game.CombatUI.loadUI();

            Game.CurrentZone = new Game.Zones.Zone('woods', {});

            // load player team
            Game.TeamBuilderUI.currentTeam().forEach(function(unit) {
                Game.UnitEngine.addUnit(unit);
            });
            Game.CombatUI.loadTeam(Game.Constants.teamIds.player);

            // load first enemy team
            Game.CurrentZone.loadNextEncounter();
        }



    };

    Game.WorldMapUI = new WorldMapUI();


}(jQuery));
