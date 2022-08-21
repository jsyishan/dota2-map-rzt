import Log from "../../framework/utils/logger";
import { registerEntityFunction } from "../../lib/dota_ts_adapter";

const TAG = "Gameplay.Trigger.RadiantBase"

registerEntityFunction("OnUnitEnter", (args: any) => {
    const activator = args.activator as CDOTA_BaseNPC
    Log.i(TAG, "enter!", activator.GetName())
    const base = Entities.FindByName(null, "dota_goodguys_fort") as CDOTA_BaseNPC
    if (activator.GetTeam() === DotaTeam.BADGUYS) {
        base.SetHealth(base.GetHealth() - activator.GetMaxHealth())
    }
    activator.Kill(null, base)
})