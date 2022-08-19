export default interface ISystem {
    onStart()
    onUpdate(dt: number)
    onDestroy?()
}