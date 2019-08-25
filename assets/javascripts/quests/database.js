
(function ($) {
    'use strict';

    Game.namespace('Quests').Database = {

        crypt: {
            name: "The Woodland Scrolls",
            completeDialog:
                "The priest reads through the scrolls and then starts an incantation.<br><br>" +
                "As he speaks, the surrounding earth quickly withers and darkens.<br><br>" +
                "&quot;It is as I feared. You must head east to the town of Greyfare, tell our findings to the archbishop.",
            onAccept: function() {
                // unlock crypt
            },
            onComplete: function() {

            }
        },

        bookOfHolyLight: {
            name: 'The Glowing Book',
            completeDialog: "Ah! The spellbook of Holy Light! Keep it, this will aid you in your travels.",
            onAccept: function() {

            },
            onComplete: function() {
                Game.Spellbook.learnSpell('holyLight');
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