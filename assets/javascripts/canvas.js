
(function($) {
    'use strict';

    var CONTINUOUS_DRAWING = true;

    var Canvas = function($canvas, config) {
        this._init($canvas, config);
    };
    Canvas.prototype = {

        _defaultConfig: {
            rows: 30,
            columns: 80
        },

        _init: function($canvas, config) {
            this.$canvas = $canvas;
            this._config = $.extend({}, this._defaultConfig, config);

            this.canvas = this.$canvas.get(0);
            this.context = this.canvas.getContext('2d');
            this._convertCanvasToHiDPI(this.width(), this.height());

            this.context.font = this.fontHeight() + 'px monospace';
            this.context.fillStyle = "#3f3f3f";
        },

        clearAll: function() {
            this.clearArea(0, 0, this.width(), this.height());
        },

        clearArea: function(x, y, width, height) {
            this.context.clearRect(x, y, width, height);
        },

        drawRect: function(x, y, width, height, color) {
            //if (CONTINUOUS_DRAWING) {
            //    x = Game.Util.defaultFor(x, 0);
            //    y = Game.Util.defaultFor(y, 0);
            //}
            //else {
            //    x = Game.Util.round(Game.Util.defaultFor(x, 0));
            //    y = Game.Util.round(Game.Util.defaultFor(y, 0));
            //}

            //var scaledX = x * this.fontWidth();
            //var scaledY = y * this.fontHeight();
            //scaledY += (this.fontHeight() - 2); // Move down one row. Move up a tiny bit.
            //scaledY += -2;

            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        },

        scaleX: function(x) {
            return x * this.fontWidth();
        },
        scaleY: function(y) {
            return y * this.fontHeight();
        },

        // x and y will be scaled
        drawImage: function(charArray, x, y, solidBackground) {
            //if (CONTINUOUS_DRAWING) {
            //    x = Game.Util.defaultFor(x, 0);
            //    y = Game.Util.defaultFor(y, 0);
            //}
            //else {
            //    x = Game.Util.round(Game.Util.defaultFor(x, 0));
            //    y = Game.Util.round(Game.Util.defaultFor(y, 0));
            //}

            // todo use scaleX function
            var scaledX = x * this.fontWidth();
            var scaledY = y * this.fontHeight();
            scaledY += (this.fontHeight() - 2); // Move down one row. Move up a tiny bit.

            // Draw one character at a time (inefficient)
            //for (var row = 0; row < charArray.length; row++) {
            //    for (var col = 0; col < charArray[row].length; col++) {
            //        this.context.fillText(
            //            charArray[row][col],
            //            scaledX + col * Game.Settings.fontWidth(),
            //            scaledY + row * Game.Settings.fontHeight()
            //        );
            //    }
            //}

            // Draw one line at a time
            for (var row = 0; row < charArray.length; row++) {

                if (solidBackground) {
                    this.drawRect(scaledX, scaledY - this.scaleY(1) + 2 + row * this.fontHeight(), this.scaleX(charArray[row].length), this.scaleY(1), '#b2cfff');
                }

                this.context.fillStyle = "#3f3f3f";
                this.context.fillText(
                    charArray[row],
                    scaledX,
                    scaledY + row * this.fontHeight()
                );
            }
        },

        width: function() {
            return this.fontWidth() * this._config.columns;
        },

        height: function() {
            return this.$canvas.parent().height();
        },

        fontWidth: function() {
            // width should be 3/5 the height
            return this.fontHeight() * 3.0 / 5.0;
        },

        fontHeight: function() {
            return this.height() / this._config.rows;
        },

        _convertCanvasToHiDPI: function(width, height, ratio) {
            if (!ratio) {
                // TODO Internet Explorer
                // https://stackoverflow.com/questions/22483296/html5-msbackingstorepixelratio-and-window-devicepixelratio-dont-exist-are-the
                var dpr = window.devicePixelRatio || 1;
                var bsr = this.context.webkitBackingStorePixelRatio ||
                    this.context.mozBackingStorePixelRatio ||
                    this.context.msBackingStorePixelRatio ||
                    this.context.oBackingStorePixelRatio ||
                    this.context.backingStorePixelRatio || 1;
                ratio = dpr / bsr;
            }

            this.canvas.width = width * ratio;
            this.canvas.height = height * ratio;
            this.canvas.style.width = width + "px";
            this.canvas.style.height = height + "px";
            this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

    };

    Game.namespace('Display').Canvas = Canvas;

}(jQuery));
