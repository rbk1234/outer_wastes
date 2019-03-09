/* Handles keyboard input */
/* Singleton */

(function($) {
    'use strict';

    var Keyboard = function() {};

    Keyboard.prototype = {

        init: function() {
            var self = this;

            this._keydownHandlers = {
                standard: {},
                shiftKey: {},
                ctrlKey: {}
            };
            this._keyupHandlers = {};
            this._lockedKeys = {}; // keys become locked once you press them down

            $(document).off('keydown').on('keydown', function(evt) {
                if (!self._lockedKeys[evt.keyCode]) { // checking lock for unmodified keyCode
                    var modifiedKeyCode = self._modifiedKeyCode(evt);

                    var handler = self._keydownHandlers[modifiedKeyCode];
                    if (handler) {
                        evt.preventDefault(); // e.g. prevent default TAB
                        handler(evt);
                    }
                    self._lockedKeys[evt.keyCode] = true; // locking unmodified keyCode
                }
            });

            $(document).off('keyup').on('keyup', function(evt) {
                var modifiedKeyCode = self._modifiedKeyCode(evt);
                var handler = self._keyupHandlers[modifiedKeyCode];
                if (handler) {
                    handler(evt);
                }
                self._lockedKeys[evt.keyCode] = false; // locking unmodified keyCode
            });
        },

        // keyCodes can be an array or a single keyCode
        // each keyCode can be an int (representing the keyCode), or an object if modifiers are needed (e.g. {keyCode: 9, shiftKey: true})
        registerKey: function(keyCodes, onKeydown, onKeyup) {
            var self = this;
            if (!Array.isArray(keyCodes)) {
                keyCodes = [keyCodes];
            }

            keyCodes.forEach(function(keyCode) {
                if (typeof keyCode === 'object') {
                    keyCode = self._modifiedKeyCode(keyCode);
                    self._keydownHandlers[keyCode] = onKeydown;
                    self._keyupHandlers[keyCode] = onKeyup;
                }
                else {
                    self._keydownHandlers[keyCode] = onKeydown;
                    self._keyupHandlers[keyCode] = onKeyup;
                }
            });
        },

        _modifiedKeyCode: function(keyData) {
            var string = '';
            if (keyData.shiftKey) {
                string += 'shift_';
            }
            if (keyData.ctrlKey) {
                string += 'ctrl_';
            }
            // todo alt?
            return string + keyData.keyCode
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

