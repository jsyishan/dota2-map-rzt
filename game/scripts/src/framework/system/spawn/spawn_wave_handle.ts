import SpawnSystemDelegate from "./spawn_system-delegate"
import IWave from "./wave-interface"
export default class SpawnWaveHandle {
    public readonly wave: IWave
    
    public onWaveEnded?: () => void
    public remain: number

    private delegate: SpawnSystemDelegate

    constructor(delegate: SpawnSystemDelegate, wave: IWave) {
        this.delegate = delegate
        this.wave = wave
    }

    public stop() {
        this.delegate.stop(this.wave)
        this.remain = 0
    }
}