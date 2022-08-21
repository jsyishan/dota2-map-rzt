import { CustomLocation } from "../../../framework/constants/location"
import { CustomUnit } from "../../../framework/constants/unit"
import ISpawnInfo from "../../../framework/system/spawn/spawn_info-interface"
import ISpawnRoute from "../../../framework/system/spawn/spawn_route-interface"
import IWave from "../../../framework/system/spawn/wave-interface"

export default class WaveTop1 implements IWave {
    info: ISpawnInfo = {
        total: 10,
        name: CustomUnit.Mob001,
        interval: 0.5,
        followRange: 700
    }
    route: ISpawnRoute = {
        birthPoint: CustomLocation.SpawnerNeutralTop1
    }
    delay = 10.0
}