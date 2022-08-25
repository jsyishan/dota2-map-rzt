import DotaAbility from "../constants/ability";
import DotaHero from "../constants/hero"
import DotaItem from "../constants/item";
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

/* heroes */
const allHeroes: Array<string> = convertEnum(DotaHero)
Log.i(TAG, `heroes: ${allHeroes.length}`)

/* items */
const allItems: Array<string> = convertEnum(DotaItem)
Log.i(TAG, `items: ${allItems.length}`)


/* abilities */
let allAbilities: Array<string> = []
for (let hero in DotaAbility) {
    const abilities = convertEnum(DotaAbility[hero])
    allAbilities = allAbilities.concat(abilities)
}
const allAbilitiesWithoutSpecial = allAbilities.filter(ability => {
    return !ability.startsWith('special')
})
Log.i(TAG, `all abilities: ${allAbilities.length}, without special: ${allAbilitiesWithoutSpecial.length}`)

export default class ConstantUtils {
    static getRandomHeroName(): string {
        return allHeroes[RandomInt(0, allHeroes.length - 1)]
    }
    static getRandomHeroAbilityName(): string {
        return allAbilitiesWithoutSpecial[RandomInt(0, allAbilitiesWithoutSpecial.length - 1)]
    }
    static getRandomItemName(): string {
        return allItems[RandomInt(0, allItems.length - 1)]
    }

    static getAllHeroes(): string[] {
        return Array.from(allHeroes)
    }
}