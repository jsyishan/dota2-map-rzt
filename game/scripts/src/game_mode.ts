import GameCore from "./framework/core/game_core";
import PrecacheLogic from "./framework/core/precache/precacheLogic";
import HeroUtils from "./framework/utils/hero_utils";
import Log from "./framework/utils/logger";
import Event_DotaPlayerGainedLevel from "./gameplay/event/dota_player_gained_level";
import Event_DotaPlayerUsedAbility from "./gameplay/event/dota_player_used_ability";
import Event_EntityKilled from "./gameplay/event/entity_killed";
import RepeatSpawner from "./gameplay/spawn/repeat_spawner";
import SequenceSpawner from "./gameplay/spawn/sequence_spawner";
import Wave1 from "./gameplay/spawn/waves/wave1";
import { reloadable } from "./lib/tstl-utils";

const TAG = "GameMode"

declare global {
    interface CDOTAGameRules {
        Addon: GameMode;
    }
}

@reloadable
export class GameMode {
    public static Precache(this: void, context: CScriptPrecacheContext) {
        PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
        PrecacheLogic.precache(context)
    }

    public static Activate(this: void) {
        GameCore.Instance   // just for init
        GameRules.Addon = new GameMode();
    }

    constructor() {
        this.configure();
    }

    private configure(): void {
        GameRules.EnableCustomGameSetupAutoLaunch(true)
        GameRules.SetCustomGameSetupAutoLaunchDelay(0)

        // time
        GameRules.SetHeroSelectionTime(0)
        GameRules.SetStrategyTime(0)
        GameRules.SetPreGameTime(0)
        GameRules.SetShowcaseTime(0)
        GameRules.SetPostGameTime(5)

        // hero
        const GameMode = GameRules.GetGameModeEntity()
        const heroName = HeroUtils.getRandomHeroName()
        GameMode.SetCustomGameForceHero(heroName)
        Log.i(TAG, `pick hero: ${heroName}`)

        GameMode.SetItemAddedToInventoryFilter((event) => {
            // remove tp
            const item = EntIndexToHScript(event.item_entindex_const) as CDOTA_Item
            if (item.GetAbilityName() === 'item_tpscroll' && !item.GetPurchaser()) {
                // remove hero's all abilities
                const hero = EntIndexToHScript(event.item_parent_entindex_const) as CDOTA_BaseNPC_Hero
                const abilityCount = hero.GetAbilityCount()
                for (let i = 0; i < abilityCount; ++i) {
                    hero.RemoveAbilityByHandle(hero.GetAbilityByIndex(i))
                }

                // set all cap to 1
                hero.SetBaseStrength(1)
                hero.SetBaseAgility(1)
                hero.SetBaseIntellect(1)

                // give random ability
                const abilityName = HeroUtils.getRandomHeroAbilityName()
                Log.i(TAG, `ability: ${abilityName}`)
                const ability = hero.AddAbility(abilityName)
                ability.SetLevel(1)
                hero.SetAbilityPoints(0)

                // full vision
                hero.SetDayTimeVisionRange(10000000)
                hero.SetNightTimeVisionRange(10000000)

                return false
            }

            return true
        }, this)

        // spawn
        // const spawner = new SequenceSpawner()
        // seqSpawner.addWaves([
        //     new Wave1(),
        //     new Wave1(),
        //     new Wave1(),
        //     new Wave1(),
        // ])

        const leftSpawner = new RepeatSpawner()
        leftSpawner.wave = new Wave1()

        const rightSpawner = new RepeatSpawner()
        const wave1 = new Wave1()
        wave1.route.birthPoint = 'l' + wave1.route.birthPoint
        rightSpawner.wave = wave1

        // event
        GameCore.Instance.eventSystem.rawRegisterEvent("game_rules_state_change", (e) => {
            if (GameRules.State_Get() === GameState.GAME_IN_PROGRESS) {
                leftSpawner.spawn()
                rightSpawner.spawn()
            }
        })
        GameCore.Instance.eventSystem.registerEvent(Event_EntityKilled)
        GameCore.Instance.eventSystem.registerEvent(Event_DotaPlayerGainedLevel)
        GameCore.Instance.eventSystem.registerEvent(Event_DotaPlayerUsedAbility)
    }

    public Reload() {
        print("Script reloaded!");
    }
}