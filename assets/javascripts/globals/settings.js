/* Player settings that may be changed over the course of the game */
/* Singleton */

(function ($) {
    'use strict';

    var CLOCK_KEY = 'Settings';

    var DEFAULT_SETTINGS = {
        autoSaveEvery: 0.1 // minutes
    };

    var Settings = function() {};

    Settings.prototype = {

        init: function() {
            var self = this;

            this.$popupContainer = $('#popup-container');
            this.$settings = $('#settings');

            this.settings = $.extend({}, DEFAULT_SETTINGS);

            $('#toggle-settings').off('click').on('click', function() {
                //Game.TownUI.closeAllPopups();
                self.toggleSettings();
            });

            this._setupSettings();
        },

        getSetting: function(key) {
            return this.settings[key];
        },

        saveData: function() {
            return this.settings;
        },

        loadData: function(data) {
            if (data === undefined) {
                return;
            }

            $.extend(this.settings, data);
        },


        toggleSettings: function() {
            var self = this;

            this.$settings.toggle();

            if (this.$settings.is(':visible')) {
                Game.Clock.setInterval(
                    CLOCK_KEY,
                    function(/* iterations, period */) {
                        self._refreshSettings();
                    },
                    1
                );
            }
            else {
                Game.Clock.clearInterval(CLOCK_KEY);
            }
        },

        _refreshSettings: function() {
            var total = (Game.Clock.total / 1000).toFixed(0);
            var lastSave = Game.Saving.savedAt ?
                Game.Util.formatDate(new Date(Game.Saving.savedAt), 'yyyy-NN-dd hh:mm:ss aaa') :
                'Never';

            $('#total-time').html(total);
            $('#last-saved-at').html(lastSave);
            $('#auto-save-every').html(Game.Settings.getSetting('autoSaveEvery'));
        },

        _setupSettings: function() {
            var self = this;

            this.$settings.find('#clear-save').off('click').on('click', function(evt) {
                evt.preventDefault();

                Game.Saving.turnOffAutoSave();
                Game.Saving.clear();
                location.reload();
            });

            this.$settings.find('#save-now').off('click').on('click', function(evt) {
                evt.preventDefault();

                Game.Saving.save();
                self._refreshSettings();
            });
        }

    };

    Game.Settings = new Settings();

}(jQuery));