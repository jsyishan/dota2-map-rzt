import { CustomUnit } from "../../framework/constants/unit"
import { registerEvent } from "../../framework/system/event/event-decorator"
import IEvent from "../../framework/system/event/event-interface"

@registerEvent("entity_killed")
export default class Event_EntityKilled implements IEvent<"entity_killed"> {
    onCall(event: GameEventProvidedProperties & EntityKilledEvent): void {
        const unit = EntIndexToHScript(event.entindex_killed) as CDOTA_BaseNPC
        if (unit.GetUnitName() === CustomUnit.Mob001) {
            const killer = EntIndexToHScript(event.entindex_attacker) as CDOTA_BaseNPC
            if (killer.IsOwnedByAnyPlayer() && killer.IsRealHero()) {
                switch (RandomInt(0, 2)) {
                    case 0:
                        killer.ModifyStrength(1)
                        break
                    case 1:
                        killer.ModifyAgility(1)
                        break
                    case 2:
                        killer.ModifyIntellect(1)
                        break
                }
                killer.CalculateStatBonus(true)

                // regen mana
                killer.GiveMana(10)
            }
        }
    }
}