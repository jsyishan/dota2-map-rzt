import ConstantUtils from "../../utils/constant_utils"

const heroSounds = ConstantUtils.getAllHeroes().map(heroName => {
    const name = heroName.substring('npc_dota_hero_'.length)
    return 'soundevents/game_sounds_heroes/game_sounds_' + name + '.vsndevts'
})

export { heroSounds }