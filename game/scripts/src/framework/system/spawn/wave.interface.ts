import ISpawnInfo from "./spawn_info.interface"
import ISpawnRoute from "./spawn_route.interface"

export default interface IWave {
    /** 
     * @name 刷怪延迟
     * @description
     * @returns number
     */
    delay?(): number,

    /** 
     * @name 刷怪信息
     * @description 刷怪信息的具体定义
     * @returns ISpawnInfo
     */
    info(): ISpawnInfo,

    /** 
     * @name 刷怪路线
     * @description 刷怪出生点、路线等
     * @returns ISpawnRoute
     */
    route(): ISpawnRoute,
}