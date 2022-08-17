import GameCore from "./framework/core/game_core";
import HeroUtils from "./framework/utils/hero_utils";
import Log from "./framework/utils/logger";
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
        PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    }

    public static Activate(this: void) {
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
                return false
            }

            return true
        }, this)

        // spawn
        const seqSpawner = new SequenceSpawner()
        seqSpawner.addWaves([
            new Wave1(),
            new Wave1(),
            new Wave1(),
            new Wave1(),
        ])

        // event
        ListenToGameEvent("game_rules_state_change", () => {
            if (GameRules.State_Get() === GameState.GAME_IN_PROGRESS) {
                seqSpawner.spawnUntilFinish()
            }
        }, this)
    }

    public Reload() {
        print("Script reloaded!");
    }
}