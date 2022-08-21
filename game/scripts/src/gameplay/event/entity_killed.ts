import { CustomLocation } from "../../framework/constants/location"
import { registerEvent } from "../../framework/system/event/event-decorator"
import IEvent from "../../framework/system/event/event-interface"
import IWave from "../../framework/system/spawn/wave-interface"
import SequenceSpawner from "../spawn/sequence_spawner"

@registerEvent("entity_killed")
export default class Event_EntityKilled implements IEvent<"entity_killed"> {
    private spawner: SequenceSpawner

    constructor() {
        this.spawner = new SequenceSpawner()
    }

    onCall(event: GameEventProvidedProperties & EntityKilledEvent): void {
        const unit = EntIndexToHScript(event.entindex_killed) as CDOTA_BaseNPC
        const killer = EntIndexToHScript(event.entindex_attacker) as CDOTA_BaseNPC_Hero
        if (unit.GetTeam() == DotaTeam.NEUTRALS) {
            const birthPoint = killer.GetTeam() === DotaTeam.GOODGUYS ? CustomLocation.SpawnerRadiantTop : CustomLocation.SpawnerDireTop
            this.spawner.addWave(new class implements IWave {
                delay = 1
                info = {
                    total: 1,
                    interval: 0.3,
                    name: unit.GetUnitName(),
                    team: killer.GetTeam()
                }
                route = {
                    birthPoint: birthPoint,
                    reachNext: true
                }
            })
            this.spawner.spawn()
        }
    }
}