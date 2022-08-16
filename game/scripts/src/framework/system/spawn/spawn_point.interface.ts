export default interface ISpawnRoute {
    /** 
     * @name 出生点
     * @description 刷怪出生点
     * @returns string
     */
    birthPoint(): string
    /** 
     * @name 路径点
     * @description 刷怪后，怪物沿着路径点移动
     * @returns string[]
     */
    waypoints?(): string[]
}