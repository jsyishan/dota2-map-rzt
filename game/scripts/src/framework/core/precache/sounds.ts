import HeroUtils from "../../utils/hero_utils"

const heroSounds = HeroUtils.getAllHeroes().map(heroName => {
    const name = heroName.substring('npc_dota_hero_'.length)
    return 'soundevents/game_sounds_heroes/game_sounds_' + name + '.vsndevts'
})

export { heroSounds }