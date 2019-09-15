(function($) {
    'use strict';

    Game.namespace('UI').Dialogs = {

        tavern_brewmaster: {
            position: { top: '12rem', right: '14rem' },
            //title: 'John &lt;Brewmaster&gt;',
            text: 'What can I get for ya?',
            options: [
                { text: "Winter Brew (10g)", onClick: function() { } },
                { text: "Roasted Quail (10g)", onClick: function() {  } },
                { text: "Tip the brewmaster (5g)", onClick: function() {  } }
            ]
        },

        tavern_swordsman_1: {
            position: { top: '18rem', left: '3rem' },
            text: "Agh, some bandits robbed me in the woods, I barely escaped with my life!<br><br>" +
            "You look useful in a fight, could you help me get my stuff back?",
            options: [
                { text: "Of course", onClick: function() {
                    Game.Quests.quest('swordsman').accept();
                    Game.PopupUI.showDialog('tavern_swordsman_2');
                } },
                { text: "Not today", onClick: function() {
                    Game.PopupUI.closeAllDialogs();
                } }
            ]
        },
        tavern_swordsman_2: {
            position: { top: '18rem', left: '3rem' },
            text: "Brom has joined your party.",
            textColor: 'yellow'
        },
        tavern_swordsman_3: {
            position: { top: '18rem', left: '3rem' },
            text: "Let's get those bandits!"
        },

        tavern_bard: {
            position: { top: '10rem', left: '38rem' },
            dimensions: { width: '35%' },
            text: "<em>For those who seek treasures and gold</em><br>" +
            "<em>Find the place of spirits old</em><br>" +
            "<em>Bring neither axe or sword</em><br>" +
            "<em>And you may steal from their hoard.</em>"
        },

        tavern_merchant: {
            position: { top: '17rem', left: '46rem' },
            text: "Ha! You'll need quite a bit more gold if you want to do business with me, my young friend."
        },

        tavern_drunk: {
            position: { top: '25rem', left: '35rem' },
            text: "&lt;The man is slouched in his chair in a drunken haze.&gt;"
        },

        tavern_villager: {
            position: { top: '22rem', left: '50rem' },
            text: "Ever since the darkness fell, the woodland creatures have grown violent and bloodthirsty.<br><br>Best stay indoors."
        },

        tavern_cartographer: {
            position: { top: '15rem', left: '11rem' },
            text: "The woods are a nasty place. If you have any hope of getting out, you'll need a map.<br><br>" +
            "I'd be willing to make you one... for the right price.",
            options: [
                { text: "Buy Map (150g)", onClick: function() {

                } }
            ]
        },

        tavern_fireplace: {
            position: { top: '20rem', left: '16rem' },
            dimensions: { width: '20%' },
            text: "The fire is roaring."
        }


};


})(jQuery);