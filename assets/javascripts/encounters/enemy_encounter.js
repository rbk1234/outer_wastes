/* Subclass of Encounter */

(function ($) {
    'use strict';

    var EnemyEncounter = function(dbKey, config) {
        Game.Encounters.Encounter.call(this, dbKey, config);
    };
    EnemyEncounter.prototype = Object.create(Game.Encounters.Encounter.prototype);
    EnemyEncounter.prototype.constructor = EnemyEncounter;

    $.extend(EnemyEncounter.prototype, {

        load: function() {
            this._loadEnemies();
            this._AIs = {};

            Game.Encounters.Encounter.prototype.load.apply(this, arguments);
        },

        update: function(seconds) {
            Game.Util.iterateObject(this._AIs, function(id, AI) {
                if (!AI) {
                    return; // The AI may have been deleted while iterating
                }

                AI.update(seconds);
                //if (AI.isExpired()) {
                //    todo delete
                //}
            });
        },

        finish: function() {
            Game.Encounters.Encounter.prototype.finish.apply(this, arguments);

            if (this.goldReward) {
                Game.CombatUI.logMessage('You loot ' + this.goldReward + ' gold.', 'yellow');
            }
            // todo item loot
        },

        _loadEnemies: function() {
            this.enemies.forEach(function(enemyDbKey) {
                var unit = new Game.Units.Unit(enemyDbKey, {teamId: Game.Constants.teamIds.computer});
                Game.UnitEngine.addUnit(unit);
            });

            Game.CombatUI.loadTeam(Game.Constants.teamIds.computer);
        },

        startAIs: function() {
            $(this).trigger('encounter:startAIs');
        },

        endAIs: function() {
            $(this).trigger('encounter:endAIs');
        },

        loadAI: function(AIParams) {
            var AI = this.createAI(AIParams);
            this._AIs[AI.id] = AI;
        },

        createAI: function(AIParams) {
            return new Game.Encounters.AI($.extend(true, this.defaultAIParams(), AIParams));
        },

        // When this ability spawns an Effect, use these defaults
        defaultAIParams: function() {
            return {
                sourceEncounter: this
            };
        }


    });

    Game.namespace('Encounters').EnemyEncounter = EnemyEncounter;






}(jQuery));