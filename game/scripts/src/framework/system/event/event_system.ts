import ISystem from "../system-interface"
import IEvent from "./event-interface"

type IntervalCallback = () => void

const intervals: Array<IntervalEvent> = [] 
class IntervalEvent {
    public readonly callback: IntervalCallback
    public readonly interval: number
    public timer: number

    constructor(callback: IntervalCallback, interval: number) {
        this.callback = callback
        this.interval = interval
        this.timer = 0
    }

    public stop() {
        const idx = intervals.indexOf(this)
        if (idx > -1) {
            intervals.splice(idx, 1)
        }
    }
}

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

    registerInterval(callback: IntervalCallback, interval: number): IntervalEvent {
        const event = new IntervalEvent(callback, interval)
        intervals.push(new IntervalEvent(callback, interval))
        return event
    }

    onStart() {

    }

    onUpdate(dt: number) {
        intervals.forEach(e => {
            e.timer += dt
            if (e.timer >= e.interval) {
                e.callback()
                e.timer = 0
            }
        })
    }
}