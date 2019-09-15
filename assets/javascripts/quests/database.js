
(function ($) {
    'use strict';

    Game.namespace('Quests').Database = {

        swordsman: {
            onAccept: function() {
                var unit = new Game.Units.Unit('swashbuckler', {teamId: Game.Constants.teamIds.player});
                Game.PartyUI.addToRoster(unit);
                Game.PartyUI.assignUnitToSlot(unit.id, 0);
            },
            onComplete: function() {
                // todo
            }
        },

        crypt: {
            name: "The Woodland Scrolls",
            startDialog: "The creatures of the forest have been growing violent. " +
                "I feel a great darkness on our horizon." +
                "<br><br>" +
                "Fetch the woodland scrolls from the abbey crypt, I need to research further.",
            completeDialog:
                "The priest reads through the scrolls and then starts an incantation.<br><br>" +
                "As he speaks, the surrounding earth quickly withers and darkens.<br><br>" +
                "&quot;It is as I feared.&quot;",
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

        journeyToTown: {
            name: 'Journey to Greyfare',
            startDialog: "You must head east to the town of Greyfare, tell our findings to the archbishop.",
            fulfillDialog: "I've marked the town on this map. You'll need to venture through the woods.",
            completeDialog: "TODO",
            onAccept: function() {
                // todo unlock map
                // todo unlock woods
                //
                Game.WorldMapUI.unlock();
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