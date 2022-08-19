export function registerEvent(eventName: keyof GameEventDeclarations) {
    return (ctor: Function) => {
        ctor.prototype.__event = eventName
    }
}