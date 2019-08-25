
(function ($) {
    'use strict';

    Game.namespace('Quests').Database = {

        crypt: {
            name: "The Crypt",
            onAccept: function() {
                // unlock crypt
            },
            onComplete: function() {

            }
        },

        magicSword: {
            name: "The Magic Sword",
            onAccept: function() {
                var unit = new Game.Units.Unit('swashbuckler', {teamId: Game.Constants.teamIds.player});
                Game.PartyUI.addToRoster(unit);
                Game.PartyUI.assignUnitToSlot(unit.id, 0);
            },
            onComplete: function() {
                // todo
            }
        }

    };

}(jQuery));