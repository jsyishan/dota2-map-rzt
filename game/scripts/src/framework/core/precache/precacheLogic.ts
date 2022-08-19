import Log from "../../utils/logger";
import { heroSounds } from "./sounds";

const TAG = "Framework.Core.Precache.PrecacheLogic"

export default class PrecacheLogic {
    static precache(context: CScriptPrecacheContext) {
        heroSounds.forEach(s => {
            PrecacheResource("soundfile", s, context);
        })
        Log.i(TAG, `precache sound files: ${heroSounds.length}`)
    }
}