import SpawnSystem from "../system/spawn/spawn_system"
import Log from "../utils/logger"

const TAG = "Framework.GameCore"

export default class GameCore {
    public readonly spawnSystem: SpawnSystem

    private static _instance: GameCore = undefined

    public static get Instance(): GameCore {
        if (!GameCore._instance) {
            GameCore._instance = new GameCore()
        }
        return GameCore._instance
    }

    private constructor() {
        Log.i(TAG, "init")
        this.spawnSystem = new SpawnSystem()
    }
}