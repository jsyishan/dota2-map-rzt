import IWave from "../../framework/system/spawn/wave.interface"

export default class Wave1 implements IWave {
    group() {
        return {
            total() {
                return 10
            },
            name() {
                return "rzt_unit_mob_001"
            },
            interval() {
                return 0.5
            }
        }
    }
    route() {
        return {
            birthPoint() {
                return "path_mob_1"
            },
        }
    }
    delay() {
        return 5.0
    }
}