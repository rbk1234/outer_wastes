
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

    var currentId = 1;

    var Ability = function(dbKey) {
        this._init(dbKey);
    };
    Ability.prototype = {

        _init: function(dbKey) {
            this.dbKey = dbKey;
            this.id = currentId++;
            this.data = $.extend(true, {}, DEFAULT_DATA_FIELDS, Game.Abilities.Database[dbKey]);
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
