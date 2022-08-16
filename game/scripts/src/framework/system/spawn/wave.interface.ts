import ISpawnGroup from "./spawn_group.interface"
import ISpawnRoute from "./spawn_point.interface"

export default interface IWave {
    delay?(): number,
    group(): ISpawnGroup,
    route(): ISpawnRoute,
}