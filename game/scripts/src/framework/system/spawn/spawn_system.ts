import Log from "../../utils/logger";
import ISystem from "../system-interface"
import SpawnSystemDelegate from "./spawn_system-delegate";
import SpawnWaveHandle from "./spawn_wave_handle";
import IWave from "./wave-interface"

const TAG = "Framework.System.SpawnSystem"
const DEFAULT_INTERVAL = 0.1

type TimerID = string

export default class SpawnSystem implements ISystem, SpawnSystemDelegate {
    private waves: Map<IWave, TimerID>

    constructor() {
        this.waves = new Map()
    }

    public spawn(wave: IWave): SpawnWaveHandle {
        if (!wave) {
            return null
        }
        const name = wave.info.name
        const birthPointEntity = Entities.FindByName(null, wave.route.birthPoint)
        const position = birthPointEntity.GetOrigin()

        const total = wave.info.total
        const interval = wave.info.interval ?? DEFAULT_INTERVAL

        const handle = new SpawnWaveHandle(this, wave)

        Timers.CreateTimer(wave.delay ?? 0, () => {
            let i = 0
            const timer = Timers.CreateTimer(() => {
                if (i++ >= total) {
                    handle.onWaveEnded?.()
                    return
                }
                handle.remain = total - i

                const mob = CreateUnitByName(name, position, true, null, null, wave.info.team ?? DotaTeam.NEUTRALS)
                if (wave.route.reachNext) {
                    mob.SetMustReachEachGoalEntity(true)
                    mob.SetInitialGoalEntity(birthPointEntity)
                    mob.SetAttackCapability(UnitAttackCapability.NO_ATTACK)
                }

                if (mob.GetTeam() === DotaTeam.NEUTRALS) {
                    mob.SetContextThink("MoveBack", () => {
                        if (!mob || !mob.IsAlive()) {
                            return
                        }
                        const distance = ((mob.GetOrigin() - position) as Vector).Length2D()
                        if (wave.info.followRange && distance >= wave.info.followRange) {
                            Log.i(TAG, distance)
                            mob.SetForceAttackTarget(mob)
                            mob.MoveToPosition(position)
                        }
                        return 1
                    }, 1)
                }
                return interval
            })
            this.waves.set(wave, timer)
        })
        return handle
    }

    stop(wave: IWave) {
        const timer = this.waves.get(wave)
        if (timer) {
            Timers.RemoveTimer(timer)
        }
    }

    waveStringify(wave: IWave) {
        return `(${wave.constructor.name}) delay: ${wave.delay}, name: ${wave.info.name}, team: ${wave.info.team} interval: ${wave.info.interval}, total: ${wave.info.total}, birthPoint: ${wave.route.birthPoint}`
    }

    onStart() {
        Log.i(TAG, "start")
    }

    onUpdate(dt: number) {

    }
}