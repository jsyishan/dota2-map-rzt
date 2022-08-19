import DotaAbility from "../constants/ability";
import DotaHero from "../constants/hero"
import Log from "./logger";

const TAG = "Framework.Utils.HeroUtils"

function convertEnum(e: any) {
    const arr = []
    for (let key in e) {
        if (isNaN(key as any)) {
            const type: any = e[key]
            arr.push(type)
        }
    }
    return arr
}

const allHeroes: Array<string> = convertEnum(DotaHero)
Log.i(TAG, `heroes: ${allHeroes.length}`)

let allAbilities: Array<string> = []
for (let hero in DotaAbility) {
    const abilities = convertEnum(DotaAbility[hero])
    allAbilities = allAbilities.concat(abilities)
}

const allAbilitiesWithoutSpecial = allAbilities.filter(ability => {
    return !ability.startsWith('special')
})

Log.i(TAG, `all abilities: ${allAbilities.length}, without special: ${allAbilitiesWithoutSpecial.length}`)

export default class HeroUtils {
    static getRandomHeroName(): string {
        return allHeroes[RandomInt(0, allHeroes.length - 1)]
    }
    static getRandomHeroAbility(): string {
        return allAbilitiesWithoutSpecial[RandomInt(0, allAbilitiesWithoutSpecial.length - 1)]
    }
}