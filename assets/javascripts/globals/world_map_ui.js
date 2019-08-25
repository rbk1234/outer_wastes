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

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {

                self.updateTimers(iterations * period);
            }, 1.0 / UPDATES_PER_SECOND);

        },

        openMap: function() {
            var self = this;

            //var world = new Game.Maps.Map('world');
            //this.$map.find('.ascii-content').html(world.display.join('\n'));

            //this.$map.show();

            Game.BackgroundUI.drawBackground('world');
            Game.BackgroundUI.setZoneName('Map of the World');

            Game.BackgroundUI.registerHandler('world.village', function() {
                Game.AbbeyUI.enterTown();
            });
            Game.BackgroundUI.registerHandler('world.village', function() {
                Game.TownUI.enterTown();
            });
            Game.BackgroundUI.registerHandler('world.woods', function() {
                self.startZone('woods');
            });
            Game.BackgroundUI.registerHandler('world.glade', function() {
                self.startZone('cursedGlade');
            });

        },

        closeMap: function() {
            //this.$map.hide();
        },

        startZone: function(zone) {
            this.closeMap();

            Game.UnitEngine.loadEngine();
            Game.CombatUI.loadUI();

            Game.CurrentZone = new Game.Zones.Zone(zone, {});

            // load player team
            Game.PartyUI.currentParty().forEach(function(unit) {
                Game.UnitEngine.addUnit(unit);
            });
            Game.CombatUI.loadTeam(Game.Constants.teamIds.player);

            // load first enemy team
            Game.CurrentZone.loadNextEncounter();
        }



    };

    Game.WorldMapUI = new WorldMapUI();


}(jQuery));
