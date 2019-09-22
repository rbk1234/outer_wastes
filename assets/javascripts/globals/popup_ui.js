
(function($) {
    'use strict';

    var PopupUI = function() {};

    PopupUI.prototype = {

        init: function() {
            var self = this;

            this.$popupContainer = $('#popup-container');
            this.$largePopup = $('#large-popup');
            this.$endOfZone = $('#end-of-zone');
            this.$dialog = $('#dialog-popup');

            this.$popupContainer.off('click', '.close-popup').on('click', '.close-popup', function(evt) {
                evt.preventDefault();

                $(this).closest('.ui-popup').hide();
            });
        },

        closeAll: function() {
            this.$popupContainer.find('.ui-popup').hide();
        },

        closeAllDialogs: function() {
            this.$popupContainer.find('.ui-popup').hide();
        },

        isDialogOpen: function(id) {
            return this.$dialog.data('id') === id && this.$dialog.is(':visible');
        },

        showDialog: function(key) {
            var dialog = Game.UI.Dialogs[key];
            var position = dialog.position || {};
            var dimensions = dialog.dimensions || {};
            var options = dialog.options || []; // option format: { text: '', onClick: function() {} }

            if (this.isDialogOpen(key)) {
                this.closeAllDialogs();
                return;
            }
            else {
                this.closeAllDialogs();
            }

            this.$dialog
                .data('id', key)
                .css('top', position.top === undefined ? 'auto' : position.top)
                .css('right', position.right === undefined ? 'auto' : position.right)
                .css('bottom', position.bottom === undefined ? 'auto' : position.bottom)
                .css('left', position.left === undefined ? 'auto' : position.left)
                .css('height', dimensions.height === undefined ? 'auto' : dimensions.height)
                .css('width', dimensions.width === undefined ? '30%' : dimensions.width);

            //this.$dialog.find('.popup-title').html(dialog.title);
            var $innerContent = this.$dialog.find('.inner-content');
            $innerContent.empty().html(dialog.text);

            $innerContent.css('color', dialog.textColor ? dialog.textColor : '');

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

        showEndOfZone: function(mainText, subText, buttonText, onClick) {
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

    Game.PopupUI = new PopupUI();

}(jQuery));
