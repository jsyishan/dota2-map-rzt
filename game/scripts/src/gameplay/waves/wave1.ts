import ISpawnInfo from "../../framework/system/spawn/spawn_info.interface"
import ISpawnRoute from "../../framework/system/spawn/spawn_point.interface"
import IWave from "../../framework/system/spawn/wave.interface"

export default class Wave1 implements IWave {
    info() {
        return {
            total() {
                return 10
            },
            name() {
                return "rzt_unit_mob_001"
            },
            interval() {
                return 0.5
            },
            repeat() {
                return true
            },
            maximum() {
                return 20
            }
        } as ISpawnInfo
    }
    route() {
        return {
            birthPoint() {
                return "path_mob_1"
            },
        } as ISpawnRoute
    }
    delay() {
        return 5.0
    }
}