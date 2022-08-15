import DotaHero from "../constants/hero"

const allHeroes: Array<string> = []
for (let hero in DotaHero) {
    allHeroes.push(hero)
}

export default class HeroUtils {
    static getRandomHeroName(): string {
        return allHeroes[Math.floor(Math.random() * allHeroes.length)]
    }
}