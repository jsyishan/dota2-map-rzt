import React from 'react';
import { render } from '@demon673/react-panorama';
import { match, P } from 'ts-pattern'

enum ItemType {
    Ability,
    Event,
    Inventory
}

function itemTypeToString(itemType: ItemType):string {
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
            <Panel className='Item' onactivate={() => {
                GameEvents.SendCustomGameEventToServer('OnClickGachaItem', { itemName: this.props.itemName, itemType: this.props.itemType as number })
                render(<></>, $.GetContextPanel())
            }}>
                <Label style={{ fontSize: '30px', horizontalAlign: 'middle', textDecoration: 'underline' }} text={itemTypeToString(this.props.itemType)} />
                {
                    this.props.itemType === ItemType.Ability &&
                    <DOTAAbilityImage style={{ width: '100%', height: '100%' }} abilityname={this.props.itemName} showtooltip={false} />
                }
                {
                    this.props.itemType === ItemType.Event &&
                    <DOTAEmoticon style={{ horizontalAlign: 'middle', verticalAlign: 'center', width: '40%', height: '40%' }} alias=':ti4gold:' />
                }
                {
                    this.props.itemType === ItemType.Inventory &&
                    <DOTAItemImage style={{ width: '100%', height: '100%' }} itemname={this.props.itemName} showtooltip={false} />
                }
                <Label style={{ textAlign: 'center', color: '#12B3D4FF', fontSize: '25px', lineHeight: '26px', fontWeight: 'medium', horizontalAlign: 'middle', verticalAlign: 'bottom' }} text={this.props.itemText} />
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
            <Panel style={{ flowChildren: 'down' }} className='Background'>
                <Label style={{ color: '#C19F1FFF', verticalAlign: 'middle', fontSize: '80px', horizontalAlign: 'center', textDecoration: 'underline' }} text="抽卡" />
                <Panel style={{ flowChildren: 'right' }}>
                    {
                        this.props.items.map((o, i) => <Item itemText={o.itemText} itemName={o.itemName} itemType={o.itemType as ItemType} key={i}/>)
                    }
                </Panel>
            </Panel>
        )
    }
}

$.Msg("test ui")

GameEvents.Subscribe('OnGachaEnter', (e) => {
    const items: Array<ItemProps> = []
    for (let i = 1; i <= Object.keys(e.itemTypes).length; i++) {
        items.push({
            itemName: e.itemNames[i],
            itemType: e.itemTypes[i],
            itemText: e.itemTexts[i] === '' ? $.Localize(`#DOTA_Tooltip_Ability_${e.itemNames[i]}`) : e.itemTexts[i]
        })
    }
    render(<Background items={items}/>, $.GetContextPanel())
    $.Msg("OnGachaEnter", items)
})

GameEvents.Subscribe('OnGachaExit', () => {
    render(<></>, $.GetContextPanel())
    $.Msg("OnGachaExit")
})