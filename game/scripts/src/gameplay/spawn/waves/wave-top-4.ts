import { CustomLocation } from "../../../framework/constants/location"
import { CustomUnit } from "../../../framework/constants/unit"
import ISpawnInfo from "../../../framework/system/spawn/spawn_info-interface"
import ISpawnRoute from "../../../framework/system/spawn/spawn_route-interface"
import IWave from "../../../framework/system/spawn/wave-interface"

export default class WaveTop4 implements IWave {
    info: ISpawnInfo = {
        total: 2,
        name: CustomUnit.Mob004,
        interval: 5,
        followRange: 1500
    }
    route: ISpawnRoute = {
        birthPoint: CustomLocation.SpawnerNeutralTop4
    }
    delay = 20.0
}