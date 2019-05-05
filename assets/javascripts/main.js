
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

    Game.UserInterface.drawBackground('forest', 0);

    var native = new Game.Units.Unit('native', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(native);
    var native = new Game.Units.Unit('native', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(native);
    //var native = new Game.Units.Unit('native', {teamId: Game.Constants.teamIds.player});
    //Game.UnitEngine.addUnit(native);
    //var native = new Game.Units.Unit('native', {teamId: Game.Constants.teamIds.player});
    //Game.UnitEngine.addUnit(native);
    var swashbuckler = new Game.Units.Unit('swashbuckler', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(swashbuckler);
    var swashbuckler = new Game.Units.Unit('swashbuckler', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(swashbuckler);
    //var swashbuckler = new Game.Units.Unit('swashbuckler', {teamId: Game.Constants.teamIds.player});
    //Game.UnitEngine.addUnit(swashbuckler);

    Game.Player = new Game.Units.Unit('player', {teamId: Game.Constants.teamIds.player});
    Game.UnitEngine.addUnit(Game.Player);

    if (true) {
        var holyLight = new Game.Abilities.Ability('holyLight');
        Game.Player.gainAbility(holyLight);
        Game.Player.equipAbility(holyLight, 0);

        var renew = new Game.Abilities.Ability('renew');
        Game.Player.gainAbility(renew);
        Game.Player.equipAbility(renew, 1);

        var blessedShield = new Game.Abilities.Ability('blessedShield');
        Game.Player.gainAbility(blessedShield);
        Game.Player.equipAbility(blessedShield, 2);

        var holyNova = new Game.Abilities.Ability('holyNova');
        Game.Player.gainAbility(holyNova);
        Game.Player.equipAbility(holyNova, 3);

        var divineSpirit = new Game.Abilities.Ability('divineSpirit');
        Game.Player.gainAbility(divineSpirit);
        //Game.Player.equipAbility(divineSpirit, 3);

        var guardianAngel = new Game.Abilities.Ability('guardianAngel');
        Game.Player.gainAbility(guardianAngel);
        //Game.Player.equipAbility(guardianAngel, 4);
    }
    if (true) {
        var livingSeed = new Game.Abilities.Ability('livingSeed');
        Game.Player.gainAbility(livingSeed);
        //Game.Player.equipAbility(livingSeed, 0);

        var bloom = new Game.Abilities.Ability('bloom');
        Game.Player.gainAbility(bloom);
        //Game.Player.equipAbility(bloom, 1);

        var naturesGrasp = new Game.Abilities.Ability('naturesGrasp');
        Game.Player.gainAbility(naturesGrasp);
        //Game.Player.equipAbility(naturesGrasp, 2);

        var friendOfTheForest = new Game.Abilities.Ability('friendOfTheForest');
        Game.Player.gainAbility(friendOfTheForest);
        //Game.Player.equipAbility(friendOfTheForest, 3);

        var overgrowth = new Game.Abilities.Ability('overgrowth');
        Game.Player.gainAbility(overgrowth);
        //Game.Player.equipAbility(overgrowth, 4);
    }

    Game.UserInterface.loadTeam(Game.Constants.teamIds.player);
    Game.Clock.run();


    //var forest = new Game.Levels.Level('forest');
    //forest.loadNextEncounter();

    Game.UserInterface.clearTarget();

    //Game.Log.logMessage('Game started!');
    //Game.UnitEngine.countdownToEncounter();

    console.log('nightvale');
    Game.UserInterface.loadMap('nightvale');
    Game.UserInterface.showMiniMap();


})(jQuery);