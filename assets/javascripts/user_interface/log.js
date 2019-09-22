/* Handles message logging (messages for the player; i.e. not to the console) */

(function($) {
    'use strict';

    var Log = function($container, config) {
        this.init($container, config);
    };

    Log.prototype = {
        _defaultConfig: {
            showTime: false,
            showGlow: false,
            dynamicScrolling: true
        },

        init: function($container, config) {
            var self = this;

            this._$container = $container;
            this._config = $.extend({}, this._defaultConfig, config);

            if (this._config.dynamicScrolling) {
                this._isAtBottom = true;

                this._$container.off('scroll').on('scroll', function() {
                    self._isAtBottom = false;
                    var container = self._$container.get(0);

                    if (container.scrollTop + self._$container.outerHeight() >= container.scrollHeight) {
                        self._isAtBottom = true;
                    }
                });
            }
        },

        clear: function() {
            this._$container.empty();

            if (this._config.dynamicScrolling) {
                this._isAtBottom = true;
            }
        },

        logMessage: function(message, klass) {
            if (this._config.showTime) {
                message = (Game.Clock.total / 1000).toFixed(3) + ': ' + message;
            }

            var $p = $('<p>')
                .addClass(klass)
                .html(message);

            //if (this._config.showGlow) {
            //    $p.addClass('glow');
            //
            //    window.setTimeout(function() {
            //        $p.removeClass('glow');
            //    }, 1000); // TODO Has to match glow animation
            //}

            this._$container.append($p);

            if (this._config.dynamicScrolling && this._isAtBottom) {
                var container = this._$container.get(0);
                container.scrollTop = container.scrollHeight;
            }
        }

    };

    Game.namespace('UI').Log = Log;

}(jQuery));
