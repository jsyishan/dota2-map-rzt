import Log from "../../../framework/utils/logger"
import { registerEntityFunction } from "../../../lib/dota_ts_adapter"

const TAG = 'ITEMS.TOWER.BASE'

registerEntityFunction("GetBehavior", kv => {
    Log.i(TAG, kv)
    return AbilityBehavior.IMMEDIATE
})

registerEntityFunction("OnSpellStart", kv => {
    Log.i(TAG, kv)
})