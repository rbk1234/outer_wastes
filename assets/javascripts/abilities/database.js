
(function ($) {
    'use strict';

    Game.namespace('Abilities').Database = {

        holyLight: {
            name: 'Holy Light',
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
                            onTick: function() {
                                this.affectedUnit.addHealth(healPerTick, this.sourceUnit);
                            }
                        }
                    });
                    target.addEffect(effect);
                }
            }
        },

        blessedShield: {
            name: 'Blessed Shield',
            icon: 'shield',
            background: 'sunny',
            description: function() {
                return 'Shields a friendly target for ' + this.duration.value() + ' seconds, absorbing up to ' +
                    this.shieldBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.shieldSpellPowerScaling.value()) + ')</span>' +
                    ' damage. Provides ' + this.armorBase.value() + ' Armor while the shield holds.';
            },

            requiresTarget: true,

            stats: {
                manaCost: 30,
                cooldown: 8,
                castTime: 0,

                shieldBase: 50,
                shieldSpellPowerScaling: 1,
                armorBase: 10,
                duration: 6
            },
            events: {
                onCastComplete: function (target) {
                    var effect = this.createEffect({
                        stats: {
                            duration: this.duration.value(),
                            absorbAmount: this.shieldBase.value() + this.caster.spellPower.value() * this.shieldSpellPowerScaling.value()
                        }
                        // TODO on gain effect -> gain armor, on lose effect -> lose armor
                    });
                    target.addEffect(effect);

                }
            }
        },

        holyNova: {
            name: 'Holy Nova',
            icon: 'explosion-rays',
            background: 'yellow',
            description: function() {
                return 'Heals all allies for ' +
                    this.healBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.healSpellPowerScaling.value()) + ')</span>' +
                    ' and damages all enemies for ' +
                    this.damageBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.damageSpellPowerScaling.value()) + ')</span>' +
                    '.';
            },
            requiresTarget: false,
            stats: {
                manaCost: 50,
                cooldown: 5,
                castTime: 1.5,

                healBase: 30,
                healSpellPowerScaling: 1,
                damageBase: 30,
                damageSpellPowerScaling: 0.5
            },
            events: {
                onCastComplete: function() {
                    var self = this;

                    var health = this.healBase.value() + this.caster.spellPower.value() * this.healSpellPowerScaling.value();
                    var damage = this.damageBase.value() + this.caster.spellPower.value() * this.damageSpellPowerScaling.value();

                    Game.UnitEngine.allies().forEach(function(ally) {
                        ally.addHealth(health, self.caster)
                    });
                    Game.UnitEngine.enemies().forEach(function(enemy) {
                        enemy.takeDamage(damage, self.caster)
                    });
                }
            }
        },

        divineSpirit: {
            events: {
                onLearnAbility: function() {

                },
                onUnlearnAbility: function() {

                }
            }
        }
    };



}(jQuery));