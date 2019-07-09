
(function($){
    'use strict';

    $(document).foundation();

    Game.Settings.init();
    Game.Clock.init();
    Game.Log.init($('#log'));
    Game.Keyboard.init();
    Game.ResourceEngine.init();
    Game.Statistics.init();
    Game.UnitEngine.init(); // todo move this to combat
    Game.BackgroundUI.init();

    Game.Clock.setInterval(
        'debug',
        function(/* iterations, period */) {
            var fps = (1000 / Game.Clock.delta).toFixed(1);
            var total = (Game.Clock.total / 1000).toFixed(0);

            $('#fps').text(fps);
            $('#total-time').text(total);
            $('#memory').text(Game.Util.roundToDecimal(Game.Util.getMemoryUsage(), 4) + 'MB');
        },
        1
    );

    Game.Log.logMessage('Initializing 1...');
    Game.Log.logMessage('Initializing 2...');
    Game.Log.logMessage('Initializing 3...');


    var crusader = new Game.Units.Unit('crusader', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(crusader);
    crusader.equipAbility('special', new Game.Abilities.Ability('blessedShield'));

    var brewmaster = new Game.Units.Unit('brewmaster', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(brewmaster);
    brewmaster.equipAbility('special', new Game.Abilities.Ability('backstab'));

    var swashbuckler = new Game.Units.Unit('swashbuckler', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(swashbuckler);
    swashbuckler.equipAbility('special', new Game.Abilities.Ability('backstab'));

    var smuggler = new Game.Units.Unit('smuggler', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(smuggler);
    smuggler.equipAbility('special', new Game.Abilities.Ability('backstab'));

    var cleric = new Game.Units.Unit('cleric', { teamId: Game.Constants.teamIds.player });
    Game.UnitEngine.addUnit(cleric);
    cleric.equipAbility('special', new Game.Abilities.Ability('holyNova'));

    var TOWN = true;

    if (TOWN) {
        Game.TownUI.init();
        Game.BackgroundUI.drawBackground('town', 0)
    }
    else {
        Game.UserInterface.init();

        Game.UserInterface.loadTeam(Game.Constants.teamIds.player);
    }

    Game.Clock.run();

    if (TOWN) {

    }
    else {
        Game.UserInterface.clearTarget();
        Game.UserInterface.loadMap('nightvale');
        Game.UserInterface.showMiniMap();
    }


})(jQuery);