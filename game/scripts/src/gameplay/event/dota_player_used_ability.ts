import { registerEvent } from "../../framework/system/event/event-decorator";
import IEvent from "../../framework/system/event/event-interface";

@registerEvent("dota_player_used_ability")
export default class Event_DotaPlayerUsedAbility implements IEvent<"dota_player_used_ability"> {
    onCall(event: GameEventProvidedProperties & DotaPlayerUsedAbilityEvent): void {
        const hero = EntIndexToHScript(event.caster_entindex) as CDOTA_BaseNPC_Hero
        const ability =  hero.FindAbilityByName(event.abilityname)
        if (ability) {
            ability.EndCooldown()
        }
    }
}