export default interface ISpawnInfo {
    /** 
     * @name 刷怪总数
     * @description
     */
    total: number,

    /** 
     * @name 怪物名字
     * @description
     */
    name: string,

    /** 
     * @name 刷怪时间间隔
     * @description 每个怪出现的间隔，单位秒
     */
    interval?: number
}