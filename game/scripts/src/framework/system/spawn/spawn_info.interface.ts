export default interface ISpawnInfo {
    /** 
     * @name 刷怪总数
     * @description
     * @returns number
     */
    total(): number,

    /** 
     * @name 怪物名字
     * @description
     * @returns string
     */
    name(): string,

    /** 
     * @name 刷怪时间间隔
     * @description 每个怪出现的间隔，单位秒
     * @returns number
     */
    interval?(): number
}