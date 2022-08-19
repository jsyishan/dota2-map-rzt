import IWave from "../../framework/system/spawn/wave-interface"
import Log from "../../framework/utils/logger"
import BaseSpawner from "./base_spawner"

const TAG = "GamePlay.Spawn.RepeatSpawner"
type TimerId = string
export default class RepeatSpawner extends BaseSpawner {
    private timer: TimerId
    private birthPoint: Vector
    private pause: boolean

    public wave: IWave

    constructor() {
        super()
        this.timer = ''
    }

    spawn() {
        if (this.wave) {
            this.repeatSpawn()
            const birthPointEntity = Entities.FindByName(null, this.wave.route.birthPoint)
            this.birthPoint = birthPointEntity.GetAbsOrigin()

            this.timer = Timers.CreateTimer(() => {
                const units = FindUnitsInRadius(
                    DotaTeam.NEUTRALS,
                    this.birthPoint,
                    null,
                    200, 
                    UnitTargetTeam.FRIENDLY, 
                    UnitTargetType.CREEP, 
                    UnitTargetFlags.NONE, 
                    FindOrder.ANY, 
                    false)
                
                if (units.length > 0) {
                    this.pause = true
                } else {
                    if (this.pause) {
                        this.repeatSpawn(true)
                    }
                    this.pause = false
                }
                return 1
            })
        }
    }

    repeatSpawn(force: boolean = false) {
        if (this.pause && !force) {
            return
        }

        const handle = this._internalSpawn(this.wave)
        if (handle) {
            handle.onWaveEnded = () => {
                this.repeatSpawn()
            }
        }
    }

    stop() {
        this._internalStop(this.wave)
        this.wave = null

        this.pause = true
        Timers.RemoveTimer(this.timer)
        this.timer = ''
    }
}