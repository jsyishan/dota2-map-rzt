import GameCore from "../../framework/core/game_core"
import SpawnWaveHandle from "../../framework/system/spawn/spawn_wave_handle"
import IWave from "../../framework/system/spawn/wave.interface"

export default abstract class BaseSpawner {
    abstract spawn(): void

    protected _internalSpawn(wave: IWave): SpawnWaveHandle {
        return GameCore.Instance.spawnSystem.spawn(wave)
    }
}