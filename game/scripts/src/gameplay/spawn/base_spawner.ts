import GameCore from "../../framework/core/game_core"
import SpawnWaveHandle from "../../framework/system/spawn/spawn_wave_handle"
import IWave from "../../framework/system/spawn/wave-interface"
import Log from "../../framework/utils/logger"

const TAG = "GamePlay.Spawn.BaseSpawner"
export default abstract class BaseSpawner {
    abstract spawn(): void

    protected _internalSpawn(wave: IWave): SpawnWaveHandle {
        const system = GameCore.Instance.spawnSystem
        Log.i(TAG, `spawn: ${system.waveStringify(wave)}`)
        return system.spawn(wave)
    }
}