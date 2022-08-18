import Log from "../../../framework/utils/logger"
import { registerEntityFunction } from "../../../lib/dota_ts_adapter"

const TAG = 'MOB.MOB001'
function Spawn(kv: any) {
    Log.i(TAG, kv)
}

registerEntityFunction("Spawn", Spawn)