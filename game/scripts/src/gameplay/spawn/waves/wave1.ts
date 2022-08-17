import ISpawnInfo from "../../../framework/system/spawn/spawn_info.interface"
import ISpawnRoute from "../../../framework/system/spawn/spawn_route.interface"
import IWave from "../../../framework/system/spawn/wave.interface"

export default class Wave1 implements IWave {
    info: ISpawnInfo = {
        total: 10,
        name: "rzt_unit_mob_001",
        interval: 0.5
    }
    route: ISpawnRoute = {
        birthPoint: "path_mob_1"
    }
    delay = 5.0
}