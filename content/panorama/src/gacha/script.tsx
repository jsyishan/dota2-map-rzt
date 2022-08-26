import React from 'react';
import { render } from '@demon673/react-panorama';
import { match, P } from 'ts-pattern'

enum ItemType {
    Ability,
    Event,
    Inventory
}

function itemTypeToString(itemType: ItemType): string {
    return match(itemType)
        .with(ItemType.Ability, () => "获得技能")
        .with(ItemType.Event, () => "触发事件")
        .with(ItemType.Inventory, () => "获得物品")
        .run()
}

type ItemProps = {
    itemName: string,
    itemText: string,
    itemType: ItemType
}

type ItemState = {
}

class Item extends React.Component<ItemProps, ItemState> {
    render(): React.ReactNode {
        return (
            <Panel id='Item' onactivate={() => {
                GameEvents.SendCustomGameEventToServer('OnClickGachaItem', { itemName: this.props.itemName, itemType: this.props.itemType as number })
                render(<></>, $.GetContextPanel())
            }}>
                <Label id='ItemTitle' text={itemTypeToString(this.props.itemType)} />
                {
                    this.props.itemType === ItemType.Ability &&
                    <DOTAAbilityImage className='FullSize' abilityname={this.props.itemName} showtooltip={false} />
                }
                {
                    this.props.itemType === ItemType.Event &&
                    <DOTAEmoticon style={{ horizontalAlign: 'middle', verticalAlign: 'center', width: '40%', height: '40%' }} alias=':ti4gold:' />
                }
                {
                    this.props.itemType === ItemType.Inventory &&
                    <DOTAItemImage className='FullSize' itemname={this.props.itemName} showtooltip={false} />
                }
                <Label id='ItemText' text={this.props.itemText} />
            </Panel>
        )
    }
}

type BackgroundProps = {
    items: Array<ItemProps>
}
class Background extends React.Component<BackgroundProps> {
    render(): React.ReactNode {
        return (
            <Panel style={{ flowChildren: 'down' }} id='Background'>
                <Label id="BackgroundTitle" text="升级" />
                <Panel style={{ flowChildren: 'right' }}>
                    {
                        this.props.items.map((o, i) => <Item itemText={o.itemText} itemName={o.itemName} itemType={o.itemType as ItemType} key={i} />)
                    }
                </Panel>
            </Panel>
        )
    }
}

$.Msg("gacha ui")

GameEvents.Subscribe('OnGachaEnter', (e) => {
    const items: Array<ItemProps> = []
    for (let i = 1; i <= Object.keys(e.itemTypes).length; i++) {
        items.push({
            itemName: e.itemNames[i],
            itemType: e.itemTypes[i],
            itemText: e.itemTexts[i] === '' ? $.Localize(`#DOTA_Tooltip_Ability_${e.itemNames[i]}`) : e.itemTexts[i]
        })
    }
    render(<Background items={items} />, $.GetContextPanel())
    $.Msg("OnGachaEnter", items)
})

GameEvents.Subscribe('OnGachaExit', () => {
    render(<></>, $.GetContextPanel())
    $.Msg("OnGachaExit")
})

function test() {
    $.Msg("test gacha ui")
    const items: Array<ItemProps> = []
    for (let i = 0; i < 3; i++) {
        items.push({
            itemName: 'item_blink',
            itemType: 2,
            itemText: $.Localize(`#DOTA_Tooltip_Ability_item_blink`)
        })
    }
    render(<Background items={items} />, $.GetContextPanel())
}
// test()