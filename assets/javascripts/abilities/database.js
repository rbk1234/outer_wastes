
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
            allowedTargets: {
                ally: true
            },
            stats: {
                manaCost: 35,
                cooldown: 0,
                castTime: 2,

                healBase: 75,
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
            allowedTargets: {
                ally: true
            },
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
            allowedTargets: {
                ally: true
            },
            stats: {
                manaCost: 60,
                cooldown: 8,
                castTime: 0,

                shieldBase: 100,
                shieldSpellPowerScaling: 1,
                armorBase: 10,
                duration: 7
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
                manaCost: 100,
                cooldown: 5,
                castTime: 1.5,

                healBase: 40,
                healSpellPowerScaling: 1,
                damageBase: 40,
                damageSpellPowerScaling: 0.75
            },
            events: {
                'ability:castComplete': function(evt, target) {
                    var self = this;

                    var health = this.healBase.value() + this.caster.spellPower.value() * this.healSpellPowerScaling.value();
                    var damage = this.damageBase.value() + this.caster.spellPower.value() * this.damageSpellPowerScaling.value();

                    this.caster.allies().forEach(function(ally) {
                        ally.addHealth(health, self.caster)
                    });
                    this.caster.enemies().forEach(function(enemy) {
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

                healBase: 40,
                healSpellPowerScaling: 0.5,
                duration: 8,
                period: 1,

                haste: 5,
                manaReduction: 0.75,
                manaReductionDuration: 10
            },
            events: {
                'ability:equip': function() {
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
                                divineSpirit.caster.allies().forEach(function(ally) {
                                    createDivineSpiritEffect(ally);
                                });
                                break;
                            default:
                                // do nothing
                        }
                    });
                },
                'ability:unequip': function() {
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
                                this.affectedUnit.equippedAbilities().forEach(function(ability) {
                                    ability.manaCost.multiplier -= divineSpirit.manaReduction.value();
                                });
                            },
                            'effect:end': function() {
                                this.affectedUnit.equippedAbilities().forEach(function(ability) {
                                    ability.manaCost.multiplier += divineSpirit.manaReduction.value();
                                });
                            }
                        }
                    });
                    this.caster.addEffect(manaReductionEffect);
                }
            }
        },

        guardianAngel: {
            name: 'Guardian Angel',
            icon: 'angel-outfit',
            background: 'opal',
            description: function() {
                return 'An angel empowers the target, granting ' +
                    this.statBonuses.value() + ' Strength, Intellect, and Haste' +
                    ' for ' + this.duration.value() + ' seconds.' +
                    ' If the target dies during the effect, the angel will restore them to ' +
                    (this.resurrectAmount.value() * 100) + '% health and end the effect.';
            },
            requiresTarget: true,
            allowedTargets: {
                ally: true
            },
            stats: {
                manaCost: 50,
                cooldown: 90,
                castTime: 0,

                statBonuses: 12,
                duration: 10,
                resurrectAmount: 0.5
            },
            events: {
                'ability:castComplete': function(evt, target) {
                    var ability = this;
                    var caster = this.caster;

                    var effect = this.createEffect({
                        stats: {
                            duration: this.duration.value()
                        },
                        events: {
                            'effect:begin': function() {
                                // todo improve str, etc.

                                $(this.affectedUnit).on('unit:beforeDeath.guardianAngel', function() {
                                    this.preventNextDeath();
                                    this.addHealth(this.maxHealth.value() * ability.resurrectAmount.value(), caster);
                                    this.removeEffect(effect);
                                });
                            },
                            'effect:end': function() {
                                // todo reduce str, etc.

                                $(this.affectedUnit).off('unit:beforeDeath.guardianAngel');
                            }
                        }
                    });
                    target.addEffect(effect);
                }
            }
        },


        livingSeed: {
            name: 'Living Seed',
            icon: 'acorn',
            background: 'forest',
            description: function() {
                return 'Heals a friendly target for ' +
                    this.healBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.healSpellPowerScaling.value()) + ')</span>' +
                    ' over ' + this.duration.value() + ' seconds,' +
                    ' or damages an enemy for ' +
                    this.damageBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.damageSpellPowerScaling.value()) + ')</span>' +
                    ' over ' + this.duration.value() + ' seconds.';
            },

            requiresTarget: true,
            allowedTargets: {
                ally: true,
                enemy: true
            },
            stats: {
                manaCost: 30,
                cooldown: 0,
                castTime: 0,

                maxStacks: 1,
                healBase: 100,
                healSpellPowerScaling: 1,
                damageBase: 60,
                damageSpellPowerScaling: 0.6,
                duration: 12,
                period: 1
            },
            events: {
                'ability:castComplete': function (evt, target) {
                    Game.Util.makeCallback(this, this.applyLivingSeed)(target);
                }
            },

            // Pull this part out into a separate function so we can call it independently (for overgrowth Ability)
            applyLivingSeed: function(target) {
                var totalAmount;
                if (this.caster.isAlliesWith(target)) {
                    totalAmount = this.healBase.value() + this.caster.spellPower.value() * this.healSpellPowerScaling.value();
                }
                else {
                    totalAmount = this.damageBase.value() + this.caster.spellPower.value() * this.damageSpellPowerScaling.value();
                }
                var numTicks = this.duration.value() / this.period.value();
                var amountPerTick = totalAmount / numTicks;

                var effect = this.createEffect({
                    stats: {
                        maxStacks: this.maxStacks.value(),
                        duration: this.duration.value(),
                        period: this.period.value()
                    },
                    events: {
                        'effect:periodicTick': function() {
                            if (this.sourceUnit.isAlliesWith(target)) {
                                this.affectedUnit.addHealth(amountPerTick, this.sourceUnit);
                            }
                            else {
                                this.affectedUnit.takeDamage(amountPerTick, this.sourceUnit);
                            }
                        }
                    }
                });
                target.addEffect(effect);
            }
        },


        bloom: {
            name: 'Bloom',
            icon: 'lotus-flower',
            background: 'green-blue',
            description: function() {
                return 'Heals a friendly target for ' +
                    this.healBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.healSpellPowerScaling.value()) + ')</span>' +
                    '. Heal is increased by ' + (this.livingSeedBonus.value() * 100) +
                    '% for each Living Seed on the target.';
            },

            requiresTarget: true,
            allowedTargets: {
                ally: true
            },
            stats: {
                manaCost: 30,
                cooldown: 0,
                castTime: 1.5,

                healBase: 60,
                healSpellPowerScaling: 1,

                livingSeedBonus: 0.3
            },
            events: {
                'ability:castComplete': function(evt, target) {
                    var heal = this.healBase.value() + this.caster.spellPower.value() * this.healSpellPowerScaling.value();

                    var livingSeedAbility = this.caster.abilityForDbKey('livingSeed');
                    var numLivingSeeds = livingSeedAbility ? target.existingEffects(livingSeedAbility.defaultEffectParams()).length : 0;

                    heal += heal * (this.livingSeedBonus.value() * numLivingSeeds);

                    target.addHealth(heal, this.caster);
                }
            }
        },

        naturesGrasp: {
            name: "Nature's Grasp",
            icon: 'light-thorny-triskelion',
            background: 'dracula',
            description: function() {
                return 'Roots latch on to the enemy, reducing their Attack Speed by ' +
                    (this.attackSpeedReduction.value() * 100) +
                    '% for ' + this.duration.value() + ' seconds.' +
                    '. If a Living Seed is on the target it will burst, instantly dealing ' +
                    this.burstBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.burstSpellPowerScaling.value()) + ')</span>' +
                    ' damage.';
            },

            requiresTarget: true,
            allowedTargets: {
                enemy: true
            },
            stats: {
                manaCost: 45,
                cooldown: 0,
                castTime: 1.5,

                attackSpeedReduction: 0.2,
                duration: 12,

                burstBase: 40,
                burstSpellPowerScaling: 0.8
            },
            events: {
                'ability:castComplete': function(evt, target) {
                    var effect = this.createEffect({
                        stats: {
                            duration: this.duration.value()
                        },
                        events: {
                            'effect:begin': function() {
                            },
                            'effect:end': function() {
                            }
                        }
                    });
                    target.addEffect(effect);

                    var livingSeedAbility = this.caster.abilityForDbKey('livingSeed');
                    var numLivingSeeds = livingSeedAbility ? target.existingEffects(livingSeedAbility.defaultEffectParams()).length : 0;
                    if (numLivingSeeds) {
                        var damage = (numLivingSeeds * (this.burstBase.value() + this.caster.spellPower.value() * this.burstSpellPowerScaling.value()));
                        target.takeDamage(damage, this.caster);
                    }

                }
            }
        },

        friendOfTheForest: {
            name: 'Friend of the Forest',
            icon: 'fairy',
            background: 'purple-opal',
            description: function() {
                return 'Passive: The faerie periodically heals allies for ' +
                    this.healBase.value() +
                    ' <span class="spell-power">(+' + (this.caster.spellPower.value() * this.healSpellPowerScaling.value()) + ')</span>' +
                    '.<br><br>' +
                    'Active: The faerie casts Gift of the Forest on the target, increasing their Armor by ' +
                    this.armorBonus.value() + ' and Attack Damage by ' + this.attackDamageBonus.value() +
                    ' for ' + this.giftOfTheWildDuration.value() + ' seconds.';
            },
            requiresTarget: true,
            allowedTargets: {
                ally: true
            },
            onGlobalCooldown: false,
            stats: {
                manaCost: 0,
                cooldown: 60,
                castTime: 0,

                // periodic heal:
                period: 3,
                healBase: 30,
                healSpellPowerScaling: 0.5,

                // gift of the wild:
                armorBonus: 5,
                attackDamageBonus: 20,
                giftOfTheWildDuration: 10
            },
            events: {
                'ability:equip': function() {
                    var friendOfTheForest = this;

                    this.friendOfTheForestEffect = this.createEffect({
                        hasDuration: false,
                        hidden: true,
                        stats: {
                            period: this.period.value()
                        },
                        events: {
                            'effect:periodicTick': function() {
                                var lowestHealthUnit = null;
                                friendOfTheForest.caster.allies().forEach(function(unit) {
                                    if (unit.percentHealth() < 100 &&
                                        (!lowestHealthUnit || unit.percentHealth() < lowestHealthUnit.percentHealth())) {
                                        lowestHealthUnit = unit;
                                    }
                                });
                                if (lowestHealthUnit) {
                                    var heal = friendOfTheForest.healBase.value() +
                                        friendOfTheForest.caster.spellPower.value() * friendOfTheForest.healSpellPowerScaling.value();
                                    lowestHealthUnit.addHealth(heal, this.sourceUnit);
                                }
                            }
                        }
                    });
                    this.caster.addEffect(this.friendOfTheForestEffect);
                },
                'ability:unequip': function() {
                    this.caster.removeEffect(this.friendOfTheForestEffect);
                },
                'ability:castComplete': function(evt, target) {
                    var friendOfTheForest = this;

                    var giftOfTheWildEffect = this.createEffect({
                        stats: {
                            armorBonus: this.armorBonus.value(),
                            attackDamageBonus: this.attackDamageBonus.value(),
                            duration: this.giftOfTheWildDuration.value()
                        },
                        effectKey: 'friendOfTheForest_gotw', // differentiate this Effect from normal Effect
                        events: {
                            'effect:begin': function() {
                                target.attackDamage.adder += friendOfTheForest.attackDamageBonus.value();
                                // todo armor
                            },
                            'effect:end': function() {
                                target.attackDamage.adder -= friendOfTheForest.attackDamageBonus.value();
                                // todo armor
                            }
                        }
                    });
                    target.addEffect(giftOfTheWildEffect);
                }
            }
        },

        overgrowth: {
            name: 'Overgrowth',
            icon: 'flowers',
            background: 'green-red',
            description: function() {
                return 'Passive: You can stack up to ' + (this.extraLivingSeeds.value() + 1) + ' Living Seeds on a target.<br><br>' +
                    'Active: Apply Living Seeds to all allies and enemies';
            },
            requiresTarget: false,
            stats: {
                manaCost: 100,
                cooldown: 55,
                castTime: 3,

                extraLivingSeeds: 1
            },
            events: {
                'ability:equip': function() {
                    var livingSeedAbility = this.caster.abilityForDbKey('livingSeed');
                    livingSeedAbility.maxStacks.adder += this.extraLivingSeeds.value();
                },
                'ability:unequip': function() {
                    var livingSeedAbility = this.caster.abilityForDbKey('livingSeed');
                    livingSeedAbility.maxStacks.adder -= this.extraLivingSeeds.value();
                },
                'ability:castComplete': function(evt, target) {
                    var livingSeedAbility = this.caster.abilityForDbKey('livingSeed');

                    this.caster.allies().forEach(function(ally) {
                        if (!ally.isDead()) {
                            Game.Util.makeCallback(livingSeedAbility, livingSeedAbility.applyLivingSeed)(ally);
                        }
                    });
                    this.caster.enemies().forEach(function(enemy) {
                        if (!enemy.isDead()) {
                            Game.Util.makeCallback(livingSeedAbility, livingSeedAbility.applyLivingSeed)(enemy);
                        }
                    });
                }
            }
        },




    };



}(jQuery));