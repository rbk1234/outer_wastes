
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


    var native = new Game.Units.Unit('native', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(native);

    Game.Player = new Game.Units.Unit('player', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(Game.Player);

    if (true) {
        var holyLight = new Game.Abilities.Ability('holyLight');
        Game.Player.addAbility(holyLight);
        Game.UserInterface.assignAbilityToBar(holyLight, 0);

        var blessedShield = new Game.Abilities.Ability('blessedShield');
        Game.Player.addAbility(blessedShield);
        Game.UserInterface.assignAbilityToBar(blessedShield, 1);

        var holyNova = new Game.Abilities.Ability('holyNova');
        Game.Player.addAbility(holyNova);
        Game.UserInterface.assignAbilityToBar(holyNova, 2);

        var divineSpirit = new Game.Abilities.Ability('divineSpirit');
        Game.Player.addAbility(divineSpirit);
        Game.UserInterface.assignAbilityToBar(divineSpirit, 3);

        var guardianAngel = new Game.Abilities.Ability('guardianAngel');
        Game.Player.addAbility(guardianAngel);
        Game.UserInterface.assignAbilityToBar(guardianAngel, 4);
    }
    else {
        var livingSeed = new Game.Abilities.Ability('livingSeed');
        Game.Player.addAbility(livingSeed);
        Game.UserInterface.assignAbilityToBar(livingSeed, 0);

        var bloom = new Game.Abilities.Ability('bloom');
        Game.Player.addAbility(bloom);
        Game.UserInterface.assignAbilityToBar(bloom, 1);

        var naturesGrasp = new Game.Abilities.Ability('naturesGrasp');
        Game.Player.addAbility(naturesGrasp);
        Game.UserInterface.assignAbilityToBar(naturesGrasp, 2);

        var friendOfTheForest = new Game.Abilities.Ability('friendOfTheForest');
        Game.Player.addAbility(friendOfTheForest);
        Game.UserInterface.assignAbilityToBar(friendOfTheForest, 3);

        var overgrowth = new Game.Abilities.Ability('overgrowth');
        Game.Player.addAbility(overgrowth);
        Game.UserInterface.assignAbilityToBar(overgrowth, 4);
    }

    Game.UserInterface.loadTeam(Game.Constants.teamIds.player);
    Game.Clock.run();


    var forest = new Game.Levels.Level('forest');
    forest.loadRandomEnemyRoom();

    Game.UserInterface.targetUnit(native);





    //
    //Game.Clock.run();
    //
    //Game.World.Engine.loadLevel(1);

    Game.Log.logMessage('Game started!');

})(jQuery);