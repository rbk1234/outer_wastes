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
            //this.$popupContainer = $('#popup-container');
            //this.$largePopup = $('#large-popup');
            //this.$endOfZone = $('#end-of-zone');
            //this.$dialog = $('#dialog-popup');

            // Register handlers:
            //this.$popupContainer.off('click', '.close-popup').on('click', '.close-popup', function(evt) {
            //    evt.preventDefault();
            //
            //    $(this).closest('.ui-popup').hide();
            //});

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

            return {
                home: this.home
            };
        },

        loadData: function(data) {
            var self = this;

            if (data === undefined) {
                return;
            }

            this.home = data.home;

        },

        _refreshUI: function() {
            this.$gold.html(Game.ResourceEngine.getAmount('gold'));
        },

        // TODO Put this home stuff somewhere
        loadHome: function() {
            switch (this.home) {
                case 'abbey':
                    this.loadAbbey();
                    break;
                case 'town':
                    this.enterTown();
                    break;
                default:
                    this.loadAbbey();
                    break;
            }
        },

        homeName: function() {
            switch (this.home) {
                case 'abbey':
                    return 'Westvale Abbey';
                case 'town':
                    return 'Greyfare';
                    break;
                default:
                    return 'Westvale Abbey';
                    break;
            }
        },

        loadTavern: function() {
            var self = this;

            Game.UnitEngine.stopEngine();
            Game.CombatUI.closeUI();

            Game.BackgroundUI.drawBackground('tavernFirstFloor');
            Game.BackgroundUI.setZoneName("Boar's Head Tavern");

            this.home = 'tavern';

            Game.BackgroundUI.registerHandler('tavern_brewmaster', function() {
                Game.PopupUI.showDialog('tavern_brewmaster');
            });
            Game.BackgroundUI.registerHandler('tavern_swordsman', function() {
                if (Game.Quests.quest('swordsman').canAccept()) {
                    Game.PopupUI.showDialog('tavern_swordsman_1');
                }
                else {
                    Game.PopupUI.showDialog('tavern_swordsman_3');
                }
            });
            Game.BackgroundUI.registerHandler('tavern_bard', function() {
                Game.PopupUI.showDialog('tavern_bard');
            });
            Game.BackgroundUI.registerHandler('tavern_merchant', function() {
                Game.PopupUI.showDialog('tavern_merchant');
            });
            Game.BackgroundUI.registerHandler('tavern_drunk', function() {
                Game.PopupUI.showDialog('tavern_drunk');
            });
            Game.BackgroundUI.registerHandler('tavern_villager', function() {
                Game.PopupUI.showDialog('tavern_villager');
            });
            Game.BackgroundUI.registerHandler('tavern_fireplace', function() {
                Game.PopupUI.showDialog('tavern_fireplace');
            });
            Game.BackgroundUI.registerHandler('tavern_cartographer', function() {
                Game.PopupUI.showDialog('tavern_cartographer');
            });

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

            this.home = 'abbey';
        },

        enterTown: function() {
            var self = this;

            Game.UnitEngine.stopEngine();
            Game.CombatUI.closeUI();

            Game.BackgroundUI.drawBackground('town');
            Game.BackgroundUI.setZoneName('Greyfare');

            Game.BackgroundUI.registerHandler('village.gate', function() {
                self.closeAllPopups();

                if (Game.PartyUI.rosterSize() > 0) {
                    Game.WorldMapUI.openMap();
                }
                else {
                    self._openText('The Town Gate', 'right-aligned',
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

            this.home = 'town';
        },

        closeAllPopups: function() {
            this.$popupContainer.find('.ui-popup').hide();
        },

        _fatherDialog: function() {
            var self = this;

            var text;

            if (Game.Quests.quest('crypt').canStart()) {
                this._showPopup("Father Dermont", 'left-aligned', '');
                this._showQuestAccept('crypt', function() {
                    self.closeAllPopups();
                    self.loadAbbey(); // Refresh background since can click crypt now
                });
            }
            else if (Game.Quests.quest('crypt').canFulfill()) {
                this._showPopup("Father Dermont", 'left-aligned', "Hurry! We need the scrolls from the crypt.");
            }
            else if (Game.Quests.quest('crypt').canComplete() || Game.Quests.quest('bookOfHolyLight').canComplete()) {
                this._showPopup("Father Dermont",'left-aligned', "What is it you've found?");

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
            else if (Game.Quests.quest('journeyToTown').canStart()) {
                this._showPopup("Father Dermont", 'left-aligned', '');
                this._showQuestAccept('journeyToTown', function() {
                    self._showQuestFulfill('journeyToTown');
                });
            }
            else {
                this._showPopup("Father Dermont", 'left-aligned', '');
                this._showQuestFulfill('journeyToTown');
            }

            this.$largePopup.show();
        },

        closeAllDialogs: function() {
            this.$popupContainer.find('.ui-popup').hide();
        },
        isDialogOpen: function(id) {
            return this.$dialog.data('id') === id && this.$dialog.is(':visible');
        },


        // dimensions: { height, width }
        // position: { top, left, right, bottom }
        _showDialog: function(id, position, dimensions, title, text, options) {
            options = Game.Util.defaultFor(options, []);

            if (this.isDialogOpen(id)) {
                this.closeAllDialogs();
                return;
            }
            else {
                this.closeAllDialogs();
            }

            this.$dialog
                .data('id', id)
                .css('top', position.top === undefined ? 'auto' : position.top)
                .css('right', position.right === undefined ? 'auto' : position.right)
                .css('bottom', position.bottom === undefined ? 'auto' : position.bottom)
                .css('left', position.left === undefined ? 'auto' : position.left)
                .css('height', dimensions.height === undefined ? 'auto' : dimensions.height)
                .css('width', dimensions.width === undefined ? '30%' : dimensions.width);

            this.$dialog.find('.popup-title').html(title);
            var $innerContent = this.$dialog.find('.inner-content');
            $innerContent.empty();
            $innerContent.html(text);

            options.forEach(function(option) {
                var $a = $('<a></a>', {
                    html: '&emsp;&gt;&nbsp;' + option.text
                });

                $a.off('click').on('click', function() {
                    option.onClick();
                });

                $a.appendTo($innerContent);
            });

            this.$dialog.show();
        },

        _showPopup: function(title, alignment, text) {
            this.$largePopup.removeClass('right-aligned left-aligned').addClass('left-aligned');
            this.$largePopup.find('.popup-title').html(title);

            var $innerContent = this.$largePopup.find('.inner-content');
            $innerContent.empty();
            $innerContent.html(text);

            var $footer = this.$largePopup.find('.footer');
            $footer.empty();

            this.$largePopup.show();
        },
        _showQuestAccept: function(questKey, onAccept) {
            var $innerContent = this.$largePopup.find('.inner-content');
            var $footer = this.$largePopup.find('.footer');

            var quest = Game.Quests.quest(questKey);

            $innerContent.empty();
            $innerContent.html(quest.startDialog);

            $footer.empty();
            var $a = $('<a></a>', {
                html: 'Accept Quest',
                class: 'button accept-quest'
            }).appendTo($footer);

            $a.off('click').on('click', function(evt) {
                evt.preventDefault();
                quest.start();
                onAccept();
            });
        },
        _showQuestFulfill: function(questKey) {
            var $innerContent = this.$largePopup.find('.inner-content');
            var $footer = this.$largePopup.find('.footer');

            var quest = Game.Quests.quest(questKey);

            $innerContent.empty();
            $innerContent.html(quest.fulfillDialog);

            $footer.empty();
        },
        _showQuestTurnin: function(questKey, onComplete) {
            var self = this;

            var $innerContent = this.$largePopup.find('.inner-content');
            var $footer = this.$largePopup.find('.footer');

            var quest = Game.Quests.quest(questKey);

            var $finalize = $('<a></a>', {
                html: quest.name,
                class: 'finalize-quest'
            }).appendTo($innerContent);

            $footer.empty();

            $finalize.off('click').on('click', function(evt) {
                evt.preventDefault();

                $innerContent.empty();
                $innerContent.html(quest.completeDialog);

                self.$largePopup.find('.popup-title').html(quest.name);

                $footer.empty();
                var $complete = $('<a></a>', {
                    html: 'Complete Quest',
                    class: 'button complete-quest'
                }).appendTo($footer);

                $complete.off('click').on('click', function(evt2) {
                    evt2.preventDefault();
                    quest.complete();
                    onComplete();
                });
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
                text = "&quot;We can leave town through the northern gate.&quot;";;
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

        zoneFailed: function() {
            var self = this;

            this._showEndOfZone(
                'Your party has been killed.',
                'You keep any items gathered so far.',
                'Return to ' + this.homeName(),
                function() {
                    self.loadHome();
                }
            )
        },
        zoneCompleted: function(zone) {
            var self = this;

            if (zone.returnHome) {
                this._showEndOfZone(
                    'You have cleared ' + zone.name + '.',
                    '',
                    'Return to ' + this.homeName(),
                    function() {
                        self.loadHome();
                    }
                )
            }
            else {
                this._showEndOfZone(
                    'You have cleared ' + zone.name + '.',
                    '',
                    'Return to the map',
                    function() {
                        Game.WorldMapUI.openMap();
                    }
                )

            }
        },

        _showEndOfZone: function(mainText, subText, buttonText, onClick) {
            var self = this;

            this.$endOfZone.find('.main-text').html(mainText);
            this.$endOfZone.find('.sub-text').html(subText);

            this.$endOfZone.find('.end-zone').html(buttonText).off('click').on('click', function(evt) {
                evt.preventDefault();
                onClick();
                self.$endOfZone.hide();
            });

            this.$endOfZone.show();
        }

    };

    Game.TownUI = new TownUI();


}(jQuery));
