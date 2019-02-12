/* Singleton */

(function($) {
    'use strict';

    var UPDATES_PER_SECOND = 15;
    var CLOCK_KEY = 'UnitEngine';

    var UnitEngine = function() {};

    UnitEngine.prototype = {
        init: function() {
            var self = this;

            this._allies = [];
            this._enemies = [];
            this._targetedUnit = null;

            this._$castBar = $('#cast-bar');
            this._$castProgress = this._$castBar.find('.cast-progress');
            this._$castText = this._$castBar.find('.bar-text');

            // Start clock
            Game.Clock.setInterval(CLOCK_KEY, function(iterations, seconds) {
                while (iterations > 0) {
                    //if (self._enemies.length) {
                        // If there are enemies, iterate through updates one by one (cannot batch)
                        self._update(seconds);
                        iterations--;
                    //}
                    //else {
                    //    // If no ememies, ok to batch updates
                    //    self._update(seconds * iterations);
                    //    iterations -= iterations;
                    //}
                }

                // Only draw once (no matter how many iterations)
                self._refreshUnitFrames();
                self._refreshCastBar();
            }, 1.0 / UPDATES_PER_SECOND);
        },
        
        addAlly: function(ally) {
            this._allies.push(ally);
        },
        addEnemy: function(enemy) {
            this._enemies.push(enemy);
        },
        clearEnemies: function() {
            this._enemies = [];
        },

        targetedUnit: function() {
            return this._targetedUnit;
        },

        // TODO Just returning first in array atm
        highestThreatAlly: function() {
            for (var i = 0; i < this._allies.length; i++) {
                var ally = this._allies[i];
                if (!ally.isDead()) {
                    return ally;
                }
            }
            return null;
        },

        // TODO Just returning first in array atm
        highestThreatEnemy: function() {
            for (var i = 0; i < this._enemies.length; i++) {
                var enemy = this._enemies[i];
                if (!enemy.isDead()) {
                    return enemy;
                }
            }
            return null;
        },

        // should handle regenning health, mana, cooldowns, attacking dealing damage, etc.
        _update: function(seconds) {
            var self = this;

            // check if complete
            var allAlliesDead = true;
            var allEnemiesDead = true;
            this._allies.forEach(function(ally) {
                if (!ally.isDead()) {
                    allAlliesDead = false;
                }
            });
            this._enemies.forEach(function(enemy) {
                if (!enemy.isDead()) {
                    allEnemiesDead = false;
                }
            });

            if (allAlliesDead || allEnemiesDead) {
                // todo level complete!
                //console.log('level complete!');
                //this.clearEnemies();
            }

            // Update allies
            this._allies.forEach(function(ally) {
                ally.update(seconds);
            });

            // Update enemies
            this._enemies.forEach(function(enemy) {
                enemy.update(seconds);
            });
        },


        // todo should we just call this after every addAlly/addEnemy
        initUnitFrames: function() {
            // clear out old frames
            $('#ally-frames').empty();
            $('#enemy-frames').empty();

            var self = this;
            this._allies.forEach(function(unit) {
                self._createAllyFrame(unit);
            });
            this._enemies.forEach(function(unit) {
                self._createEnemyFrame(unit);
            });
        },
        _createAllyFrame: function(unit) {
            var $frame = $('<div></div>', {
                class: 'ally-frame'
            }).appendTo($('#ally-frames'));

            this._addBars($frame, unit);

            $('<div></div>', {
                class: 'effects',
                //text: 'buff1 buff2 buff3'
            }).appendTo($frame);
        },
        _createEnemyFrame: function(unit) {
            var $frame = $('<div></div>', {
                class: 'enemy-frame'
            }).appendTo($('#enemy-frames'));

            $('<div></div>', {
                class: 'effects',
                //text: 'buff1 buff2 buff3'
            }).appendTo($frame);

            this._addBars($frame, unit);
        },
        _addBars: function($frame, unit) {
            var self = this;

            var $bars = $('<div></div>', {
                class: 'bars',
                text: unit.name()
            }).appendTo($frame);

            $bars.off('click').on('click', function() {
                self._targetedUnit = unit;
                $('.bars').removeClass('targeted');
                $bars.addClass('targeted');
            });

            this._addBar($bars, 'health');
            //this._addBar($bars, 'mana');
        },
        _addBar: function($bars, barClass) {
            var $bar = $('<div></div>', {
                class: 'bar'
            }).appendTo($bars);
            $('<div></div>', {
                class: 'bar-layer background',
                style: 'width: 100%;'
            }).appendTo($bar);
            $('<div></div>', {
                class: 'bar-layer ' + barClass,
                style: 'width: 50%;'
            }).appendTo($bar);
        },

        _refreshUnitFrames: function() {
            var self = this;

            $('#ally-frames').find('.ally-frame').each(function(index) {
                var $frame = $(this);
                var unit = self._allies[index];
                var widthPercent = Game.Util.round(unit._health / unit.getStat('maxHealth')) * 100 + '%';
                $frame.find('.bar-layer.health').css('width', widthPercent);
            });
            $('#enemy-frames').find('.enemy-frame').each(function(index) {
                var $frame = $(this);
                var unit = self._enemies[index];
                var widthPercent = Game.Util.round(unit._health / unit.getStat('maxHealth')) * 100 + '%';
                $frame.find('.bar-layer.health').css('width', widthPercent);
            });
        },

        getPlayer: function() {
            return this._allies[this._allies.length - 1];
        },
        startCast: function(text, duration) {
            this._$castProgress.removeClass('casting cast-complete cast-canceled');
            this._$castProgress.addClass('casting');
            this._$castText.html(text);
            this._$castBar.stop(); // stop any fade outs
            this._$castBar.fadeIn(0); // reverse any fade outs
            this._$castBar.show();

            //this._castInterval = setInterval(function() {
            //
            //}, duration * 1000);
        },
        castComplete: function() {
            this._$castProgress.removeClass('casting cast-complete cast-canceled');
            this._$castProgress.addClass('cast-complete');
            this._$castBar.fadeOut(500);
        },
        cancelCast: function() {
            this._$castProgress.removeClass('casting cast-complete cast-canceled');
            this._$castProgress.addClass('cast-canceled');
            this._$castText.html('Interrupted');
            this._$castBar.fadeOut(500);
        },
        _refreshCastBar: function() {
            var player = this.getPlayer();
            var widthPercent = player.castPercent() + '%';
            this._$castProgress.css('width', widthPercent);
        }


        //_drawUnit: function(unit, index) {
        //    var unitY = this._level.height() - unit.height() - unit.y();
        //    this._unitCanvas.drawImage(unit.image(), unit.x(), unitY, true);
        //
        //    // draw health bar
        //    var x = this._uiCanvas.scaleX(unit.x());
        //    var y = this._uiCanvas.scaleY(unitY) - 5; // move up a bit
        //    var healthPercent = unit.health() / unit.maxHealth();
        //
        //    // hsv
        //    // h: 120 -> 0
        //    // s: whiteness pick between 0.7 and 1.0
        //    // v: darkness pick between 0.7 and 1.0
        //    var hue = healthPercent * 120.0;
        //    var saturation = '80%';
        //    var lightness = '50%';
        //
        //    if (!unit.isDead()) {
        //        this._uiCanvas.drawRect(x - 1, y - 1, 40 + 2, 2 + 2 , 'black');
        //        this._uiCanvas.drawRect(x, y, 40 * (healthPercent), 2 , 'hsl('+hue+','+saturation+','+lightness+')');
        //    }
        //}

    };

    Game.UnitEngine = new UnitEngine();

}(jQuery));
