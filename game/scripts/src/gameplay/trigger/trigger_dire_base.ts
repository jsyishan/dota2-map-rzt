import Log from "../../framework/utils/logger";
import { registerEntityFunction } from "../../lib/dota_ts_adapter";

const TAG = "Gameplay.Trigger.DireBase"

registerEntityFunction("OnUnitEnter", (args: any) => {
    const activator = args.activator as CDOTA_BaseNPC
    Log.i(TAG, "enter!", activator.GetName())
    const base = Entities.FindByName(null, "dota_badguys_fort") as CDOTA_BaseNPC
    if (activator.GetTeam() === DotaTeam.GOODGUYS) {
        base.SetHealth(base.GetHealth() - activator.GetMaxHealth())
    }
    activator.Kill(null, base)
})