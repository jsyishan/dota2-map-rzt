export default class GlobalEntity {
    private direBaseEntity: CDOTA_BaseNPC_Building
    private radiantBaseEntity: CDOTA_BaseNPC_Building

    getDireBaseEntity(): CDOTA_BaseNPC_Building {
        if (!this.direBaseEntity) {
            this.direBaseEntity = Entities.FindByName(null, "dota_badguys_fort") as CDOTA_BaseNPC_Building
        }
        return this.direBaseEntity
    }

    getRadiantBaseEntity(): CDOTA_BaseNPC_Building {
        if (!this.radiantBaseEntity) {
            this.radiantBaseEntity = Entities.FindByName(null, "dota_goodguys_fort") as CDOTA_BaseNPC_Building
        }
        return this.radiantBaseEntity
    }
}