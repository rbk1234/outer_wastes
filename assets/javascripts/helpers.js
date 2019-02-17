/* Various helper functions */

(function($) {
    'use strict';

    // --------- Some jQuery helpers

    // Change element's visibility (like show/hide except the element still takes up space)
    $.fn.visible = function() {
        return this.css('visibility', 'visible');
    };

    $.fn.invisible = function() {
        return this.css('visibility', 'hidden');
    };

    $.fn.visibilityToggle = function(state) {
        if ( typeof state === "boolean" ) {
            return state ? this.visible() : this.invisible();
        }

        return this.css('visibility', function(i, visibility) {
            return (visibility === 'visible') ? 'hidden' : 'visible';
        });
    };

    // Checks whether element is actually still in DOM, or if it's just cached
    $.fn.isStale = function() {
        // Note: document.contains() does not work in Internet Explorer (IE does not consider the document an element)
        return this[0] !== document && !document.body.contains(this[0]);
    };


    // --------- Some misc helpers

    Game.namespace("Util");

    Game.Util.toast = function(text) {
        $.toast({
            text: text, // Text that is to be shown in the toast
            heading: '', // Optional heading to be shown on the toast

            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: false, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 3, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values

            bgColor: '#b01a00',  // Background color of the toast
            textColor: '#eeeeee',  // Text color of the toast
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: false,  // Whether to show loader or not. True by default
            loaderBg: '#9EC600',  // Background color of the toast loader
            beforeShow: function () {}, // will be triggered before the toast is shown
            afterShown: function () {}, // will be triggered after the toat has been shown
            beforeHide: function () {}, // will be triggered before the toast gets hidden
            afterHidden: function () {}  // will be triggered after the toast has been hidden
        });
    };

    Game.Util.getMemoryUsage = function() {
        if (performance && performance.memory) {
            return performance.memory.usedJSHeapSize / 1048576.0; // in MB
        }
        else {
            return -1;
        }
    };

    var EPSILON = 0.000001; // Adding an epsilon to handle floating point rounding errors

    // Rounds to 5 decimals by default. Use roundToDecimal for more precision
    // This should be used before any comparisons (e.g. < <= > >=) because of floating point rounding errors
    Game.Util.round = function(num) {
        return Game.Util.roundToDecimal(num, 5);
    };

    Game.Util.roundToDecimal = function(num, numDecimals) {
        if (numDecimals === 0) {
            return Math.round(num + EPSILON)
        }
        else {
            var factor = 10 * numDecimals;
            return Math.round((num + EPSILON) * factor) / factor;
        }
    };


    Game.Util.minScreenWidth = function() {
        return parseInt($('.main-content').css('min-width'));
    };

    Game.Util.makeCallback = function (target, method) {
        return function () {
            method.apply(target, arguments);
        };
    };

    // Iterates through the keys of the object, calling the given function on each (key, value) pair
    Game.Util.iterateObject = function(obj, fn, thisArg) {
        if (obj) {
            Object.keys(obj).forEach(function(key) {
                fn.call(thisArg, key, obj[key]);
            }, this);
        }
    };

    // Will return defaultValue if arg undefined, or if arg is an element of badValues. Otherwise returns arg.
    Game.Util.defaultFor = function (arg, defaultValue, badValues) {
        var useDefault = false;

        if ($.isArray(badValues)) {
            $.each(badValues, function(index, value) {
                if (arg === value) {
                    useDefault = true;
                }
            });
        }

        return (typeof arg === 'undefined' || useDefault) ? defaultValue : arg;
    };

    Game.Util.isString = function(obj) {
        return (typeof obj === 'string' || obj instanceof String);
    };

    // Creates an array of length 'length', with each element set to be 'initialValue'
    Game.Util.createArray = function(length, initialValue) {
        initialValue = Game.Util.defaultFor(initialValue, null);

        var array = [];
        for (var i = 0; i < length; i++) {
            array.push(initialValue);
        }

        return array;
    };

    Game.Util.arrayDifference = function (mainArray, subtractedArray) {
        return mainArray.filter(function(i) {
            return subtractedArray.indexOf(i) < 0;
        });
    };

    // Similar to jQuery's inArray, but returns true/false instead of array index
    Game.Util.inArray = function(item, array) {
        return array && $.inArray(item, array) !== -1;
    };

    Game.Util.arraysEqual = function(array1, array2) {
        if (array1 === array2) {
            return true;
        }
        if (array1 === null || array2 === null) {
            return false;
        }
        if (array1.length !== array2.length) {
            return false;
        }

        for (var i = 0; i < array1.length; ++i) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    };

    // Adds commas to break up large numbers: 12345.6789 => 12,345.6789
    Game.Util.numberWithCommas = function(number) {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Only apply commas to non-decimal part of number
        return parts.join(".");
    };

    // Escapes certain characters to avoid 'invalid regular expression' errors when searching
    Game.Util.safeRegExp = function(pattern, flags) {
        var safePattern = pattern.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(safePattern, flags);
    };

    // Updates a Foundation tooltip's title text (simply replacing the 'title' prop will not work during runtime)
    Game.Util.updateFoundationTooltip = function($tooltip, newText) {
        if (newText) {
            window.Foundation.libs.tooltip.getTip($tooltip).contents().first().replaceWith(newText);
        }
    };

    Game.Util.capitalizeFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    Game.Util.logPerformance = function (key, start, end) {
        key = Game.Util.stringToFixedLength(key, 20);
        var time = Game.Util.stringToFixedLength((end - start).toFixed(2), 9, true);
        console.log(key + ' : ' + time + ' milliseconds');
    };

    Game.Util.stringToFixedLength = function(str, length, padLeft, padCharacter) {
        padCharacter = Game.Util.defaultFor(padCharacter, ' ');

        var padding = new Array(length).join(padCharacter);

        if (typeof str === 'undefined') {
            return padding;
        }

        if (padLeft) {
            return (padding + str).slice(-length);
        } else {
            return (str + padding).substring(0, length);
        }
    };

})(jQuery);
