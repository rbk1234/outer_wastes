
(function($) {
    'use strict';

    var Ability = function(id) {
        this._init(id);
    };
    Ability.prototype = {

        _init: function(id) {
            this.id = id;

            this._dbRecord = $.extend(true, {}, Game.Database.Abilities[id]);


        },

        iconClass: function() {
            return this._dbRecord.iconClass;
        },

        update: function(seconds) {
            // todo reduce cooldown
        },

        energyCost: function() {
            return this._dbRecord.energyCost;
        },

        casterEffects: function() {
            return this._dbRecord.casterEffects;
        }




    };

    Game.namespace('World').Ability = Ability;

}(jQuery));
