import IWave from "../../framework/system/spawn/wave-interface"
import Log from "../../framework/utils/logger"
import BaseSpawner from "./base_spawner"

const TAG = "GamePlay.Spawn.SequenceSpawner"

export default class SequenceSpawner extends BaseSpawner {
    private waveQueue: Array<IWave>

    constructor() {
        super()
        this.waveQueue = []
    }

    addWave(wave: IWave) {
        this.waveQueue.push(wave)
    }

    addWaves(waves: Array<IWave>) {
        this.waveQueue = this.waveQueue.concat(waves)
    }

    spawn() {
        const wave = this.waveQueue.shift()
        if (wave) {
            return super._internalSpawn(wave)
        }
    }

    stop() {
        
    }

    spawnUntilFinish() {
        const handle = this.spawn()
        if (handle) {
            handle.onWaveEnded = () => {
                this.spawnUntilFinish()
            }
        }
    }
}