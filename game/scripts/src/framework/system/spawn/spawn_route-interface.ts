type Vec3 = Array<number>[3]
export default interface ISpawnRoute {
    /** 
     * @name 出生点
     * @description 刷怪出生点
     */
    birthPoint: string

    reachNext?: boolean
}