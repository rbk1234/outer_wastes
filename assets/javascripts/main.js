
(function($){
    'use strict';

    $(document).foundation();

    // Create Player early due to references to Game.Player.id
    Game.Player = new Game.Units.Unit('cleric', {teamId: Game.Constants.teamIds.player});

    Game.Settings.init();
    Game.Clock.init();
    Game.Keyboard.init();
    Game.ResourceEngine.init();
    Game.Statistics.init();
    Game.BackgroundUI.init();
    Game.UnitEngine.init();
    Game.CombatUI.init();
    Game.TownUI.init();
    Game.PartyUI.init();
    Game.WorldMapUI.init();

    Game.Saving.init();
    Game.Saving.load();

    Game.Player.equipAbility(0, new Game.Abilities.Ability('holyLight'));
    Game.Player.equipAbility(1, new Game.Abilities.Ability('renew'));

    Game.Clock.setInterval(
        'debug',
        function(/* iterations, period */) {
            var fps = (1000 / Game.Clock.delta).toFixed(1);
            var total = (Game.Clock.total / 1000).toFixed(0);

            $('#fps').text(fps);
            $('#total-time').text(total);
            $('#memory').text(Game.Util.roundToDecimal(Game.Util.getMemoryUsage(), 4) + 'MB');

            //Game.CombatUI.logMessage('Time is: ' + total);
        },
        1
    );


    Game.Clock.run();

    Game.TownUI.loadTown();

    //Game.Keyboard.registerKey([81], function() { // q
    //    loadQuest();
    //});
    //Game.Keyboard.registerKey([87], function() { // w
    //    loadTown();
    //});
    //Game.Keyboard.registerKey([82], function() { // r
    //
    //});
    //Game.Keyboard.registerKey([84], function() { // t
    //
    //});


})(jQuery);