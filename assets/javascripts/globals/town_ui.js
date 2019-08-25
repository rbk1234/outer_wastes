/* TownUI is a Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 1;
    var CLOCK_KEY = 'TownUI';


    var TownUI = function() {};

    TownUI.prototype = {
        init: function() {
            var self = this;

            this.$gold = $('#gold-value');
            this.$popupContainer = $('#popup-container');
            this.$largePopup = $('#large-popup');
            this.$returnToTown = $('#return-to-town');

            // Register handlers:
            this.$popupContainer.off('click', '.close-popup').on('click', '.close-popup', function(evt) {
                evt.preventDefault();

                $(this).closest('.ui-popup').hide();
            });

            this._setupReturnToTown();

            Game.Timers.addTimerSupport(this);

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, period) {
                // Only draw once (no matter how many iterations)
                self._refreshUI();

                self.updateTimers(iterations * period);
            }, 1.0 / UPDATES_PER_SECOND);

        },

        saveData: function() {
            //var self = this;

            return {}; // todo
        },

        loadData: function(data) {
            var self = this;

            if (data === undefined) {
                return;
            }

            // todo
        },

        _refreshUI: function() {
            this.$gold.html(Game.ResourceEngine.getAmount('gold'));
        },

        loadAbbey: function() {
            var self = this;

            Game.UnitEngine.stopEngine();
            Game.CombatUI.closeUI();

            Game.BackgroundUI.drawBackground('abbey');
            Game.BackgroundUI.setZoneName('Westvale Abbey');

            Game.BackgroundUI.registerHandler('abbey.father', function() {
                self._fatherDialog();
            });

            Game.BackgroundUI.registerHandler('abbey.crypt', function() {
                Game.WorldMapUI.startZone('crypt');
            });
        },

        enterTown: function() {
            var self = this;

            Game.UnitEngine.stopEngine();
            Game.CombatUI.closeUI();

            Game.BackgroundUI.drawBackground('town');
            Game.BackgroundUI.setZoneName('The Village');

            Game.BackgroundUI.registerHandler('village.gate', function() {
                self.closeAllPopups();

                if (Game.PartyUI.rosterSize() > 0) {
                    Game.WorldMapUI.openMap();
                }
                else {
                    self._openText('The Village Gate', 'right-aligned',
                        "The guardsman stops you from leaving.<br><br>" +
                        "&quot;It's too dangerous to venture outside the walls alone.&quot;");
                }
            });

            Game.BackgroundUI.registerHandler('village.blacksmith', function() {
                self._openBlacksmith();
            });
            Game.BackgroundUI.registerHandler('village.swordsman', function() {
                self._openSwordsman();
            });
            //Game.BackgroundUI.registerHandler('village.villager1', function() {
            //    var villager1Text = "&quot;The darkness... it's lasted far too long.&quot;<br><br>" +
            //        "The villager gestures at the sky then begins to close his door.<br><br>" +
            //        "&quot;Best stay in the village.&quot;" +
            //        "";
            //    self._openText('Villager House', 'right-aligned', villager1Text);
            //});
        },

        closeAllPopups: function() {
            this.$popupContainer.find('.ui-popup').hide();
        },

        _fatherDialog: function() {
            var self = this;

            var text;

            if (Game.Quests.quest('crypt').canStart()) {
                text = "The creatures of the forest have been growing violent. " +
                    //"I fear a darkness coming." +
                    "I feel a great darkness on our horizon." +
                    "<br><br>" +
                    "Fetch the woodland scrolls from the abbey crypt, I need to research further.";
                this._showPopup("Father Dermont", 'left-aligned', text);
                this._showQuestAccept('crypt', function() {
                    self.closeAllPopups();
                    self.loadAbbey(); // Refresh background since can click crypt now
                });
            }
            else if (Game.Quests.quest('crypt').canFulfill()) {
                this._showPopup("Father Dermont", 'left-aligned', "Hurry! We need the scrolls from the crypt.");
            }
            else if (Game.Quests.quest('crypt').canComplete() || Game.Quests.quest('bookOfHolyLight').canComplete()) {
                this._showPopup("Father Dermont",'left-aligned', "Quickly, show me what you've found.");

                if (Game.Quests.quest('crypt').canComplete()) {
                    this._showQuestTurnin('crypt', function() {
                        self._fatherDialog();
                    });
                }
                if (Game.Quests.quest('bookOfHolyLight').canComplete()) {
                    this._showQuestTurnin('bookOfHolyLight', function() {
                        self._fatherDialog();
                    });
                }
            }
            else {
                // todo unlock map
                // todo unlock woods
                //
                this._showPopup("Father Dermont",'left-aligned', "I've marked Greyfare on your map.<br><br>" +
                    "Keep a wary eye, these woods grow more dangerous by the day.");
            }

            this.$largePopup.show();
        },



        _showPopup: function(title, alignment, text) {
            this.$largePopup.removeClass('right-aligned left-aligned').addClass('left-aligned');
            this.$largePopup.find('.popup-title').html(title);

            var $innerContent = this.$largePopup.find('.inner-content');
            $innerContent.empty();

            $innerContent.html(text);

            this.$largePopup.show();
        },
        _showQuestTurnin: function(questKey, onComplete) {
            var $innerContent = this.$largePopup.find('.inner-content');
            var quest = Game.Quests.quest(questKey);

            var $finalize = $('<a></a>', {
                html: quest.name,
                class: 'finalize-quest'
            }).appendTo($innerContent);

            $finalize.off('click').on('click', function(evt) {
                evt.preventDefault();

                $innerContent.empty();
                $innerContent.html(quest.completeDialog);
                var $complete = $('<a></a>', {
                    html: 'Complete Quest',
                    class: 'complete-quest'
                }).appendTo($innerContent);

                $complete.off('click').on('click', function(evt2) {
                    evt2.preventDefault();
                    quest.complete();
                    onComplete();
                });
            });
        },
        _showQuestAccept: function(questKey, onAccept) {
            var $innerContent = this.$largePopup.find('.inner-content');
            var quest = Game.Quests.quest(questKey);

            var $div = $('<div></div>', {
                class: 'text-center'
            }).appendTo($innerContent);

            var $a = $('<a></a>', {
                html: 'Accept Quest',
                class: 'button accept-quest'
            }).appendTo($div);

            $a.off('click').on('click', function(evt) {
                evt.preventDefault();
                quest.start();
                onAccept();
            });
        },

        _openSwordsman: function() {
            var self = this;

            this.$largePopup.removeClass('right-aligned left-aligned').addClass('left-aligned');
            this.$largePopup.find('.popup-title').html("Swordsman's House");

            var $innerContent = this._clearInnerContent();
            var text;

            if (Game.Quests.canAcceptQuest('magicSword')) {
                text = "&quot;I lost my magic sword inside of a cave north of here. I'll accompany you if you help me find it.&quot;";;
                $innerContent.html(text);

                var $div = $('<div></div>', {
                    class: 'text-center'
                }).appendTo($innerContent);

                var $a = $('<a></a>', {
                    html: 'Accept Quest',
                    class: 'button accept-quest'
                }).appendTo($div);

                $a.off('click').on('click', function(evt) {
                    evt.preventDefault();

                    Game.Quests.acceptQuest('magicSword');
                    self._openSwordsman();
                });
            }
            else if (Game.Quests.isOnQuest('magicSword')) {
                text = "&quot;We can leave the village through the northern gate.&quot;";;
                $innerContent.html(text);
            }
            else if (Game.Quests.completedQuest('magicSword')) {

            }

            this.$largePopup.show();
        },

        _openText: function(title, alignment, text) {
            this.$largePopup.removeClass('right-aligned left-aligned').addClass(alignment);
            this.$largePopup.find('.popup-title').html(title);

            var $innerContent = this._clearInnerContent();
            $innerContent.html(text);

            this.$largePopup.show();
        },

        _openBlacksmith: function() {
            this.$largePopup.removeClass('right-aligned left-aligned').addClass('right-aligned');
            this.$largePopup.find('.popup-title').html('Blacksmith');

            this._clearInnerContent();

            this._listItem({
                icon: 'sword-brandish',
                name: 'Short Sword',
                cost: '15 gold, 3 bronze bars',

                learned: true,
                purchase: 'Craft'
            });
            this._listItem({
                icon: 'viking-shield',
                name: 'Small Shield',
                cost: '10 gold, 1 bronze bar',

                learned: false,
                requirements: 'Req. level 45'
            });

            this.$largePopup.show();
        },

        _clearInnerContent: function() {
            return this.$largePopup.find('.inner-content').empty();
        },
        _listItem: function(item) {
            var $template = $('#item-template').find('.item');

            var $item = $template.clone();
            $item.find('.item-icon').addClass(item.icon);
            $item.find('.item-name').html(item.name);
            $item.find('.item-cost').html(item.cost);

            $item.toggleClass('unlearned', !item.learned);
            $item.find('.item-requirements').toggle(!item.learned).html(item.requirements);
            $item.find('.item-purchase').toggle(!!item.learned).html(item.purchase);

            this.$largePopup.find('.inner-content').append($item);
        },

        toggleReturnToTown: function(show) {
            this.$returnToTown.toggle(show);
        },

        _setupReturnToTown: function() {
            var self = this;

            this.$returnToTown.find('.go-to-village').off('click').on('click', function(evt) {
                evt.preventDefault();
                self.toggleReturnToTown(false);
                self.enterTown();
            })
        }

    };

    Game.TownUI = new TownUI();


}(jQuery));
