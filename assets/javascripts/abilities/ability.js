
(function($) {
    'use strict';

    var DEFAULT_DATA_FIELDS = {
        name: 'Unknown',
        manaCost: 0,
        cooldown: 0,
        castTime: 1.5,
        requiresTarget: false,
        onCastComplete: function(caster, target) {
            // do nothing
        }
    };

    var Ability = function(id) {
        this._init(id);
    };
    Ability.prototype = {

        _init: function(id) {
            this.id = id;
            this.data = $.extend(true, {}, DEFAULT_DATA_FIELDS, Game.Abilities.Database[id]);
        },
        getData: function(field) {
            return this.data[field];
        },






        update: function(seconds) {
            // todo reduce cooldown
        },



    };

    Game.namespace('Abilities').Ability = Ability;

}(jQuery));
