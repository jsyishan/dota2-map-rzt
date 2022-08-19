import { registerEvent } from "../../framework/system/event/event-decorator";
import IEvent from "../../framework/system/event/event-interface";
import HeroUtils from "../../framework/utils/hero_utils";

@registerEvent("dota_player_gained_level")
export default class Event_DotaPlayerGainedLevel implements IEvent<"dota_player_gained_level"> {
    onCall(event: GameEventProvidedProperties & DotaPlayerGainedLevelEvent): void {
        const hero = EntIndexToHScript(event.hero_entindex) as CDOTA_BaseNPC_Hero
        hero.AddAbility(HeroUtils.getRandomHeroAbility())
    }
}