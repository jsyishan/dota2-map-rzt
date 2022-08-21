import GameCore from "./framework/core/game_core";
import PrecacheLogic from "./framework/core/precache/precacheLogic";
import HeroUtils from "./framework/utils/hero_utils";
import Log from "./framework/utils/logger";
import Event_DotaPlayerGainedLevel from "./gameplay/event/dota_player_gained_level";
import Event_DotaPlayerUsedAbility from "./gameplay/event/dota_player_used_ability";
import Event_EntityKilled from "./gameplay/event/entity_killed";
import RepeatSpawnerPool from "./gameplay/spawn/repeat_spawner_pool";
import WaveTop1 from "./gameplay/spawn/waves/wave-top-1";
import WaveTop2 from "./gameplay/spawn/waves/wave-top-2";
import WaveTop3 from "./gameplay/spawn/waves/wave-top-3";
import WaveTop4 from "./gameplay/spawn/waves/wave-top-4";
import WaveTop5 from "./gameplay/spawn/waves/wave-top-5";
import WaveTop6 from "./gameplay/spawn/waves/wave-top-6";
import WaveTop7 from "./gameplay/spawn/waves/wave-top-7";
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
        // GameRules.EnableCustomGameSetupAutoLaunch(true)
        // GameRules.SetCustomGameSetupAutoLaunchDelay(0)

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

                // give random ability
                const abilityName = HeroUtils.getRandomHeroAbilityName()
                Log.i(TAG, `ability: ${abilityName}`)
                const ability = hero.AddAbility(abilityName)
                Log.show(TAG, hero, true, abilityName)
                ability.SetLevel(1)
                hero.SetAbilityPoints(0)

                hero.AddItemByName("item_blink")

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

        const spawnPool = new RepeatSpawnerPool()
        spawnPool.addWave(new WaveTop1())
        spawnPool.addWave(new WaveTop2())
        spawnPool.addWave(new WaveTop3())
        spawnPool.addWave(new WaveTop4())
        spawnPool.addWave(new WaveTop5())
        spawnPool.addWave(new WaveTop6())
        spawnPool.addWave(new WaveTop7())

        // event
        GameCore.Instance.eventSystem.rawRegisterEvent("game_rules_state_change", (e) => {
            if (GameRules.State_Get() === GameState.GAME_IN_PROGRESS) {
                spawnPool.start()
            }
        })
        GameCore.Instance.eventSystem.registerEvent(Event_EntityKilled)
        GameCore.Instance.eventSystem.registerEvent(Event_DotaPlayerGainedLevel)
        // GameCore.Instance.eventSystem.registerEvent(Event_DotaPlayerUsedAbility)
    }

    public Reload() {
        print("Script reloaded!");
    }
}