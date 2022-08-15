enum LogLevel {
    Info  = "I",
    Warn  = "W",
    Error = "E"
}

function dump(o: any) {
    if (typeof(o) === 'object') {
        let s = '{ '
        Object.entries<object>(o).forEach(kv => {
            let k = kv[0]
            let v = kv[1]
            if (typeof(k) !== 'number') {
                k = `"${k}"`
            }
            s += `[${k}] = ${dump(v)}, `
        })
        return `${s}} `
    } else {
        return o.toString()
    }
}

export default class Log {
    static i(tag, ...args) {
        print(`[${tag}][${LogLevel.Info}] ${args.length > 1 ? dump(args) : args[0]}`)
    }

    static w(tag, ...args) {
        print(`[${tag}][${LogLevel.Warn}] ${args.length > 1 ? dump(args) : args[0]}`)
    }

    static e(tag, ...args) {
        print(`[${tag}][${LogLevel.Error}] ${args.length > 1 ? dump(args) : args[0]}`)
    }
}