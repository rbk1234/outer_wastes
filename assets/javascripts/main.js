
(function($){
    'use strict';

    $(document).foundation();

    Game.Settings.init();
    Game.Clock.init();
    Game.Log.init($('#log'));
    Game.Keyboard.init();
    Game.ResourceEngine.init();
    Game.Statistics.init();
    Game.BottomBar.init();

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

    // global
    //  - settings, clock, log, keyboard, statistics, resources
    // units
    //  - Units (database)
    //  - Unit (base class)
    //  - Enemy (sub class)
    //  - Ally (sub class)
    //  - player? (sub class)
    // abilities
    //  - Abilities (database)
    //  - Ability (base class)
    // effects
    //  - Effects (database)
    //  - Effect (base class)
    //  - Buff (sub class)
    //  - Debuff (sub class)
    // levels
    //  - Levels (database)
    //  - Level (base class)
    // rooms
    //  - Rooms (database)
    //  - Room (base class)
    //  - CombatRoom (sub class)
    //  - MerchantRoom (sub class)
    //  - EventRoom (sub class)

    // Allies are global
    // Room loads in allies, and loads in enemies
    // then starts fight
    // TODO Load ally 1 - 4 and player

    // Level
    // Have multiple rooms
    //  rooms can be: enemy rooms, merchants, event rooms

    // just init room 1
    Game.UnitEngine.init();

    Game.UnitEngine.addAlly(new Game.Units.Ally(3));
    Game.UnitEngine.addAlly(new Game.Units.Ally(1));
    Game.UnitEngine.initUnitFrames();

    var room1 = new Game.Rooms.EnemyRoom(1);
    Game.Clock.run();





    //
    //Game.Clock.run();
    //
    //Game.World.Engine.loadLevel(1);

    Game.Log.logMessage('Game started!');

})(jQuery);