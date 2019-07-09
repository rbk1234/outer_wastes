
(function($){
    'use strict';

    $(document).foundation();

    Game.Settings.init();
    Game.Clock.init();
    Game.Log.init($('#log'));
    Game.Keyboard.init();
    Game.ResourceEngine.init();
    Game.Statistics.init();
    Game.BackgroundUI.init();
    Game.UnitEngine.init();
    Game.CombatUI.init();
    Game.TownUI.init();

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

    function loadTown() {
        Game.UnitEngine.stopEngine();
        Game.CombatUI.closeUI();

        Game.BackgroundUI.drawBackground('town', 0)
    }

    function loadQuest() {
        // -------- Background
        Game.BackgroundUI.drawBackground('woods', 0);

        // -------- UnitEngine
        Game.UnitEngine.loadEngine();

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

        // -------- CombatUI
        Game.CombatUI.loadUI();


        //Game.CombatUI.loadMap('nightvale');
        //Game.CombatUI.showMiniMap();
    }

    Game.Clock.run();

    loadTown();

    Game.Keyboard.registerKey([81], function() { // q
        loadQuest();
    });
    Game.Keyboard.registerKey([87], function() { // w
        loadTown();
    });
    Game.Keyboard.registerKey([69], function() { // e
        Game.UnitEngine.loadTile(new Game.UI.Tile('woods'));
    });
    //Game.Keyboard.registerKey([82], function() { // r
    //
    //});
    //Game.Keyboard.registerKey([84], function() { // t
    //
    //});


})(jQuery);