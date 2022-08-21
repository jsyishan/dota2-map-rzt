import { CustomLocation } from "../../../framework/constants/location"
import { CustomUnit } from "../../../framework/constants/unit"
import ISpawnInfo from "../../../framework/system/spawn/spawn_info-interface"
import ISpawnRoute from "../../../framework/system/spawn/spawn_route-interface"
import IWave from "../../../framework/system/spawn/wave-interface"

export default class WaveTop2 implements IWave {
    info: ISpawnInfo = {
        total: 5,
        name: CustomUnit.Mob002,
        interval: 2,
        followRange: 1000
    }
    route: ISpawnRoute = {
        birthPoint: CustomLocation.SpawnerNeutralTop2
    }
    delay = 10.0
}