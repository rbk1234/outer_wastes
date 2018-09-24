
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

    Game.World.Engine.init();

    Game.Clock.run();

    Game.World.Engine.loadLevel(1);

    Game.Log.logMessage('Game started!');

})(jQuery);