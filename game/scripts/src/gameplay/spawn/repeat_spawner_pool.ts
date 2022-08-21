import IWave from "../../framework/system/spawn/wave-interface";
import RepeatSpawner from "./repeat_spawner";

export default class RepeatSpawnerPool {
    spawners: Array<RepeatSpawner>

    constructor() {
        this.spawners = []
    }

    addWave(wave: IWave) {
        const spawner = new RepeatSpawner()
        spawner.wave = wave
        this.spawners.push(spawner)
    }

    start() {
        this.spawners.forEach(s => {
            s.spawn()
        })
    }

    stop() {
        this.spawners.forEach(s => {
            s.stop()
        })
    }
}