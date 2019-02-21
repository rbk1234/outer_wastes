
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
                'ability:castComplete': function(evt, target) {
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
                'ability:castComplete': function (evt, target) {
                    var totalHeal = this.healBase.value() + this.caster.spellPower.value() * this.healSpellPowerScaling.value();
                    var numTicks = this.duration.value() / this.period.value();
                    var healPerTick = totalHeal / numTicks;

                    var effect = this.createEffect({
                        stats: {
                            duration: this.duration.value(),
                            period: this.period.value()
                        },
                        events: {
                            'effect:periodicTick': function() {
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
                'ability:castComplete': function (evt, target) {
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
                'ability:castComplete': function(evt, target) {
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
            name: 'Divine Spirit',
            icon: 'mighty-force',
            background: 'beige',
            description: function() {
                return 'Passive: Your direct heals and shields apply Divine Spirit, healing the target for ' +
                    this.healBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.healSpellPowerScaling.value()) + ')</span>' +
                    ' over ' + this.duration.value() + ' seconds and granting them ' + this.haste.value() + ' Haste.<br><br>' +
                    'Active: Fortify your spirit, reducing the mana cost of spells by ' +
                    this.manaReduction.value() * 100 + '% for ' + this.manaReductionDuration.value() + ' seconds.';
            },
            requiresTarget: false,
            onGlobalCooldown: false,
            stats: {
                manaCost: 0,
                cooldown: 60,
                castTime: 0,

                healBase: 30,
                healSpellPowerScaling: 0.5,
                duration: 10,
                period: 1,

                haste: 5,
                manaReduction: 0.75,
                manaReductionDuration: 10
            },
            events: {
                'ability:learn': function() {
                    var divineSpirit = this;

                    function createDivineSpiritEffect(target) {
                        var totalHeal = divineSpirit.healBase.value() + divineSpirit.caster.spellPower.value() * divineSpirit.healSpellPowerScaling.value();
                        var numTicks = divineSpirit.duration.value() / divineSpirit.period.value();
                        var healPerTick = totalHeal / numTicks;

                        var effect = divineSpirit.createEffect({
                            stats: {
                                duration: divineSpirit.duration.value(),
                                period: divineSpirit.period.value()
                            },
                            events: {
                                'effect:periodicTick': function() {
                                    this.affectedUnit.addHealth(healPerTick, this.sourceUnit);
                                }
                            }
                        });
                        target.addEffect(effect);
                    }

                    $(this.caster).on('unit:castComplete.divineSpirit', function(evt, ability, target) {
                        switch(ability.dbKey) {
                            case 'holyLight':
                            case 'blessedShield':
                                createDivineSpiritEffect(target);
                                break;
                            case 'holyNova':
                                Game.UnitEngine.allies().forEach(function(ally) {
                                    createDivineSpiritEffect(ally);
                                });
                                break;
                            default:
                                // do nothing
                        }
                    });
                },
                // TODO: will this ever happen?
                'ability:unlearn': function() {
                    $(this.caster).off('unit:castComplete.divineSpirit');
                },
                'ability:castComplete': function() {
                    var divineSpirit = this;

                    var manaReductionEffect = this.createEffect({
                        icon: 'splashy-stream',
                        background: 'purple-blue',
                        stats: {
                            duration: this.manaReductionDuration.value()
                        },
                        effectKey: 'divineSpirit_manaReduction', // differentiate this Effect from normal divineSpirit Effect
                        events: {
                            'effect:begin': function() {
                                Game.Util.iterateObject(this.affectedUnit.abilities(), function(abilityId, ability) {
                                    ability.manaCost.multiplier -= divineSpirit.manaReduction.value();
                                });
                            },
                            'effect:end': function() {
                                Game.Util.iterateObject(this.affectedUnit.abilities(), function(abilityId, ability) {
                                    ability.manaCost.multiplier += divineSpirit.manaReduction.value();
                                });
                            }
                        }
                    });
                    this.caster.addEffect(manaReductionEffect);
                }
            }
        }
    };



}(jQuery));