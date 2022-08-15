import HeroUtils from "./framework/utils/hero_utils";
import Log from "./framework/utils/logger";
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
        Log.i(TAG, heroName)
    }
    
    public Reload() {
        print("Script reloaded!");
    }
}