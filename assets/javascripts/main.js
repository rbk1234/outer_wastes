
(function($){
    'use strict';

    $(document).foundation();

    Game.Settings.init();
    Game.Clock.init();
    Game.Log.init($('#log'));
    Game.Keyboard.init();
    Game.ResourceEngine.init();
    Game.Statistics.init();
    Game.UnitEngine.init();
    Game.UserInterface.init();

    Game.Clock.setInterval(
        'debug',
        function(/* iterations, seconds */) {
            var fps = (1000 / Game.Clock.delta).toFixed(1);
            var total = (Game.Clock.total / 1000).toFixed(0);

            $('#fps').text(fps);
            $('#total-time').text(total);
            $('#memory').text(Game.Util.roundToDecimal(Game.Util.getMemoryUsage(), 1) + 'MB');
        },
        1
    );

    Game.Log.logMessage('Initializing 1...');
    Game.Log.logMessage('Initializing 2...');
    Game.Log.logMessage('Initializing 3...');

    // just init room 1

    Game.UnitEngine.addAlly(new Game.Units.Ally(3));
    Game.Player = new Game.Units.Ally(1);
    Game.Player.addAbility('heal');
    Game.UnitEngine.addAlly(Game.Player);
    Game.UserInterface.loadUnits();

    var room1 = new Game.Rooms.EnemyRoom(1);
    Game.Clock.run();





    //
    //Game.Clock.run();
    //
    //Game.World.Engine.loadLevel(1);

    Game.Log.logMessage('Game started!');

})(jQuery);