import EventSystem from "../system/event/event_system"
import SpawnSystem from "../system/spawn/spawn_system"
import ISystem from "../system/system-interface"
import Log from "../utils/logger"
import GlobalEntity from "./global_entity"

const TAG = "Framework.GameCore"

export default class GameCore {
    public readonly spawnSystem: SpawnSystem
    public readonly eventSystem: EventSystem
    public readonly globalEntity: GlobalEntity

    private systems: Array<ISystem>

    private static _instance: GameCore = undefined

    public static get Instance(): GameCore {
        if (!GameCore._instance) {
            GameCore._instance = new GameCore()
        }
        return GameCore._instance
    }

    private constructor() {
        Log.i(TAG, "init")
        this.globalEntity = new GlobalEntity()
        this.systems = []

        this.spawnSystem = new SpawnSystem()
        this.eventSystem = new EventSystem()

        this.systems.push(this.spawnSystem)
        this.systems.push(this.eventSystem)

        this.systems.forEach(s => {
            s.onStart()
        })
        
        GameRules.GetGameModeEntity().SetThink(() => {
            const dt = GameRules.GetGameFrameTime()
            this.systems.forEach(s => {
                s.onUpdate(dt)
            })
            return 0
        }, this, "OnUpdate", 0)
    }
}