
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

    Game.Clock.run();

    Game.TownUI.loadTown();

    //Game.Keyboard.registerKey([81], function() { // q
    //    loadQuest();
    //});
    //Game.Keyboard.registerKey([87], function() { // w
    //    loadTown();
    //});
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