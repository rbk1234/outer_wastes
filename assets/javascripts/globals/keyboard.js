/* Handles keyboard input */
/* Singleton */

(function($) {
    'use strict';

    var Keyboard = function() {};

    Keyboard.prototype = {

        init: function() {
            var self = this;

            this._keydownHandlers = {};
            this._keyupHandlers = {};
            this._lockedKeys = {}; // keys become locked once you press them down

            $(document).off('keydown').on('keydown', function(evt) {
                if (!self._lockedKeys[evt.keyCode]) {
                    var handler = self._keydownHandlers[evt.keyCode];
                    if (handler) {
                        handler(evt);
                    }
                    self._lockedKeys[evt.keyCode] = true;
                }
            });

            $(document).off('keyup').on('keyup', function(evt) {
                var handler = self._keyupHandlers[evt.keyCode];
                if (handler) {
                    handler(evt);
                }
                self._lockedKeys[evt.keyCode] = false;
            });
        },

        registerKey: function(keyCode, onKeydown, onKeyup) {
            this._keydownHandlers[keyCode] = onKeydown;
            this._keyupHandlers[keyCode] = onKeyup;
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

