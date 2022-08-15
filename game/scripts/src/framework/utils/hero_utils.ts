import DotaHero from "../constants/hero"
import Log from "./logger";

const TAG = "Framework.Utils.HeroUtils"

const allHeroes: Array<string> = []
for (let key in DotaHero) {
    if (isNaN(key as any)) {
        const type: any = DotaHero[key];
        const e: DotaHero = type;
        allHeroes.push(e)
    }
}
Log.i(TAG, `heroes: ${allHeroes.length}`)

export default class HeroUtils {
    static getRandomHeroName(): string {
        return allHeroes[RandomInt(0, allHeroes.length - 1)]
    }
}