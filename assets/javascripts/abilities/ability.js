
(function($) {
    'use strict';

    var Ability = function(id) {
        this._init(id);
    };
    Ability.prototype = {

        _init: function(id) {
            this.id = id;

            this._dbRecord = $.extend(true, {}, Game.Abilities.Database[id]);


        },

        iconClass: function() {
            return this._dbRecord.iconClass;
        },

        update: function(seconds) {
            // todo reduce cooldown
        },

        manaCost: function() {
            return this._dbRecord.manaCost;
        },

        casterEffects: function() {
            return this._dbRecord.casterEffects;
        }




    };

    Game.namespace('Abilities').Ability = Ability;

}(jQuery));
