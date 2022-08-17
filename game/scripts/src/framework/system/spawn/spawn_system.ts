import Log from "../../utils/logger";
import ISystem from "../system.interface"
import SpawnSystemDelegate from "./spawn_system.delegate";
import SpawnWaveHandle from "./spawn_wave_handle";
import IWave from "./wave.interface"

const TAG = "Framework.System.SpawnSystem"
const DEFAULT_INTERVAL = 0.1

type TimerID = string

export default class SpawnSystem implements ISystem, SpawnSystemDelegate {
    private waves: Map<IWave, TimerID> 

    constructor() {
        Log.i(TAG, "init")
        this.waves = new Map()
    }

    public spawn(wave: IWave): SpawnWaveHandle {
        const name = wave.info().name()
        const position = Entities.FindByName(null, wave.route().birthPoint()).GetOrigin()

        const total = wave.info().total()
        const interval = wave.info().interval() ?? DEFAULT_INTERVAL

        Timers.CreateTimer(wave.delay() ?? 0, () => {
            let i = 0
            const timer = Timers.CreateTimer(() => {
                if (!wave.info().repeat() && i++ >= total) {
                    return
                }

                const mob = CreateUnitByName(name, position, true, null, null, DotaTeam.NEUTRALS)
                return interval
            })
            this.waves.set(wave, timer)
        })
        return new SpawnWaveHandle(this, wave)
    }

    stop(wave: IWave) {
        const timer = this.waves.get(wave)
        if (timer) {
            Timers.RemoveTimer(timer)
        }
    }
}