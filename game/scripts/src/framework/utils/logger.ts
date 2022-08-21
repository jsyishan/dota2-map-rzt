enum LogLevel {
    Info = "I",
    Show = "S",
    Warn = "W",
    Error = "E",
}

function dump(o: any) {
    if (typeof (o) === 'object') {
        let s = '{ '
        Object.entries<object>(o).forEach(kv => {
            let k = kv[0]
            let v = kv[1]
            if (typeof (k) !== 'number') {
                k = `"${k}"`
            }
            s += `[${k}] = ${dump(v)}, `
        })
        return `${s}} `
    } else {
        return o.toString()
    }
}

function getInfo(...args) {
    let info
    if (args.length > 1) {
        info = dump(args)
    } else if (args.length === 1 && typeof (args[0]) === 'object') {
        info = dump(args)
    } else {
        info = args[0]
    }
    return info
}

function _print(tag, level, ...args) {
    print(`${GetSystemDate()}-${GetSystemTime()} [${tag}][${level}] ${getInfo(...args)}`)
}
export default class Log {
    static i(tag: string, ...args) {
        _print(tag, LogLevel.Info, ...args)
    }

    static w(tag: string, ...args) {
        _print(tag, LogLevel.Warn, ...args)
    }

    static e(tag: string, ...args) {
        _print(tag, LogLevel.Error, ...args)
    }

    static show(tag: string, entity: CBaseEntity, all: boolean, msg: string) {
        if (!entity) {
            entity = GameRules.GetGameModeEntity()
        }
        _print(tag, LogLevel.Show, msg)
        Say(entity, msg, !all)
    }
}