import Log from "../../utils/logger";
import ISystem from "../system.interface"
import IWave from "./wave.interface"

const TAG = "Framework.System.SpawnSystem"
const DEFAULT_INTERVAL = 0.1

export default class SpawnSystem implements ISystem {
    constructor() {
        Log.i(TAG, "init")
    }

    public spawn(wave: IWave) {
        const name = wave.info().name()
        const position = Entities.FindByName(null, wave.route().birthPoint()).GetOrigin()

        const total = wave.info().total()
        const interval = wave.info().interval() ?? DEFAULT_INTERVAL

        Timers.CreateTimer(wave.delay() ?? 0, () => {
            let i = 0
            Timers.CreateTimer(() => {
                if (i++ >= total) {
                    return
                }

                const mob = CreateUnitByName(name, position, true, null, null, DotaTeam.NEUTRALS)
                return interval
            })
        })
    }
}