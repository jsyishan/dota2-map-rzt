import ISystem from "../system-interface"
import IEvent from "./event-interface";


export default class EventSystem implements ISystem {
    rawRegisterEvent(eventName: keyof GameEventDeclarations, callback: (event: GameEventProvidedProperties & GameEventDeclarations[keyof GameEventDeclarations]) => void) {
        ListenToGameEvent(eventName, callback, this)
    }

    registerEvent<TName extends keyof GameEventDeclarations>(eventCtor: { new (): IEvent<TName> }) {
        const event = new eventCtor()
        ListenToGameEvent(event.__event, (e) => {
            event.onCall(e)
        }, this)
    }

    onStart() {

    }

    onUpdate(dt: number) {

    }
}