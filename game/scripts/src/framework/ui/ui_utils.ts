import ConstantUtils from "../utils/constant_utils"

enum ItemType {
    Ability,
    Event,
    Inventory
}

class GachaItem {
    itemType: ItemType
    itemName: string
    itemText: string
}

export default class UIUtils {
    public static getRandomGachaItem(): GachaItem {
        const type = RandomInt(0, 2) as ItemType
        let name = ''
        let text = ''
        if (type === ItemType.Ability) {
            name = ConstantUtils.getRandomHeroAbilityName()
        } else if (type === ItemType.Inventory) {
            name = ConstantUtils.getRandomItemName()
        } else {
            name = 'event_xx'
            text = '无事发生'
        }
        return {
            itemType: type,
            itemName: name,
            itemText: text
        }
    }

    public static showRandomGachaUI(playerId?: PlayerID, allPlayer: boolean = false) {
        const ran = [UIUtils.getRandomGachaItem(), UIUtils.getRandomGachaItem(), UIUtils.getRandomGachaItem()]

        if (allPlayer) {
            CustomGameEventManager.Send_ServerToAllClients("OnGachaEnter", {
                itemTypes: ran.map(i => i.itemType),
                itemNames: ran.map(i => i.itemName),
                itemTexts: ran.map(i => i.itemText)
            })
        } else {
            const player = PlayerResource.GetPlayer(playerId)
            CustomGameEventManager.Send_ServerToPlayer(player, "OnGachaEnter", {
                itemTypes: ran.map(i => i.itemType),
                itemNames: ran.map(i => i.itemName),
                itemTexts: ran.map(i => i.itemText)
            })
        }
    }
}