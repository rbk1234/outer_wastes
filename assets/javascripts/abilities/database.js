
(function ($) {
    'use strict';

    Game.namespace('Abilities').Database = {

        heal: {
            name: 'Heal',
            icon: 'hand-bandage',
            background: 'pink',
            description: function() {
                return 'Heals a friendly target for ' +
                    this.healBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.healSpellPowerScaling.value()) + ')</span>' +
                    '.';
            },

            requiresTarget: true,

            stats: {
                manaCost: 20,
                cooldown: 0,
                castTime: 2,

                healBase: 60,
                healSpellPowerScaling: 1
            },
            events: {
                onCastComplete: function(target) {
                    var health = this.healBase.value() + this.caster.spellPower.value() * this.healSpellPowerScaling.value();
                    target.addHealth(health, this.caster);
                }
            }
        },

        renew: {
            name: 'Renew',
            icon: 'healing',
            background: 'green',
            description: function() {
                return 'Heals a friendly target for ' +
                    this.healBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.healSpellPowerScaling.value()) + ')</span>' +
                    ' over ' + this.duration.value() + ' seconds.';
            },

            requiresTarget: true,

            stats: {
                manaCost: 20,
                cooldown: 0,
                castTime: 0,

                healBase: 100,
                healSpellPowerScaling: 1,
                duration: 10,
                period: 1
            },
            events: {
                onCastComplete: function (target) {
                    var totalHeal = this.healBase.value() + this.caster.spellPower.value() * this.healSpellPowerScaling.value();
                    var numTicks = this.duration.value() / this.period.value();
                    var healPerTick = totalHeal / numTicks;

                    var effect = this.createEffect({
                        stats: {
                            duration: this.duration.value(),
                            period: this.period.value()
                        },
                        events: {
                            onTick: function(affectedUnit, sourceUnit) {
                                affectedUnit.addHealth(healPerTick, sourceUnit)
                            }
                        }
                    });
                    target.addEffect(effect);
                }
            }
        },

        shield: {
            name: 'Shield',
            icon: 'shield',
            background: 'sunny',
            description: function() {
                return 'Shields a friendly target for ' + this.duration.value() + ' seconds, absorbing up to ' +
                    this.shieldBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.shieldSpellPowerScaling.value()) + ')</span>' +
                    ' damage.';
            },

            requiresTarget: true,

            stats: {
                manaCost: 30,
                cooldown: 8,
                castTime: 0,

                shieldBase: 50,
                shieldSpellPowerScaling: 1,
                duration: 6
            },
            events: {
                onCastComplete: function (target) {
                    var effect = this.createEffect({
                        stats: {
                            duration: this.duration.value(),
                            absorbAmount: this.shieldBase.value() + this.caster.spellPower.value() * this.shieldSpellPowerScaling.value()
                        }
                    });
                    target.addEffect(effect);

                }
            }
        }
    };



}(jQuery));