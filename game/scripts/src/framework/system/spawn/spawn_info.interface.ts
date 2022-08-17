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

    /** 
     * @name 是否重复刷怪
     * @description
     * @returns boolean
     */
    repeat?(): boolean,

    /** 
     * @name 刷怪最大值
     * @description 当刷怪模式为无限时，可以设置最大值防止怪物过多
     * @returns number
     */
    maximum?(): number
}