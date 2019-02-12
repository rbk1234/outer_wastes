/* Handles keyboard input */
/* Singleton */

(function($) {
    'use strict';

    var Keyboard = function() {};

    Keyboard.prototype = {

        init: function() {
            var self = this;

            this._handlers = {};

            $(document).off('keydown').on('keydown', function(evt) {
                var handler = self._handlers[evt.keyCode];
                if (handler) {
                    handler(evt);
                }
            });
        },

        registerKey: function(keyCode, onKeyDown) {
            this._handlers[keyCode] = onKeyDown;
        }

        // TODO Delete this: this is for games where holding down (multiple) keys is possible

        //init: function() {
        //    var self = this;
        //
        //    this.keysDown = {};
        //
        //    $(document).off('keydown').on('keydown', function(evt) {
        //        self.keysDown[evt.keyCode] = true;
        //    });
        //
        //    $(document).off('keyup').on('keyup', function(evt) {
        //        delete self.keysDown[evt.keyCode];
        //    });
        //},
        //
        //isKeyDown: function(keyCode) {
        //    return this.keysDown[keyCode];
        //},

    };

    Game.Keyboard = new Keyboard();

}(jQuery));

