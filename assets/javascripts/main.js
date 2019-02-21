
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

    // just init room 1

    var native = new Game.Units.Ally('native');
    Game.UnitEngine.addAlly(native);

    Game.Player = new Game.Units.Ally('player');

    var holyLight = new Game.Abilities.Ability('holyLight');
    Game.Player.addAbility(holyLight);
    Game.UserInterface.assignAbilityToBar(holyLight, 0);

    //var renew = new Game.Abilities.Ability('renew');
    //Game.Player.addAbility(renew);
    //Game.UserInterface.assignAbilityToBar(renew, 1);

    var blessedShield = new Game.Abilities.Ability('blessedShield');
    Game.Player.addAbility(blessedShield);
    Game.UserInterface.assignAbilityToBar(blessedShield, 1);

    var holyNova = new Game.Abilities.Ability('holyNova');
    Game.Player.addAbility(holyNova);
    Game.UserInterface.assignAbilityToBar(holyNova, 2);

    var divineSpirit = new Game.Abilities.Ability('divineSpirit');
    Game.Player.addAbility(divineSpirit);
    Game.UserInterface.assignAbilityToBar(divineSpirit, 3);

    Game.UserInterface.assignAbilityToBar(null, 4);

    Game.UnitEngine.addAlly(Game.Player);

    Game.UserInterface.loadUnits();

    var room1 = new Game.Rooms.EnemyRoom(1);
    Game.Clock.run();

    //Game.UserInterface.targetUnit(native);





    //
    //Game.Clock.run();
    //
    //Game.World.Engine.loadLevel(1);

    Game.Log.logMessage('Game started!');

})(jQuery);