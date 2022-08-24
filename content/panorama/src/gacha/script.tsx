import React from 'react';
import { render } from '@demon673/react-panorama';

type ItemProps = {
    name: string
}

type ItemState = {

}

class Item extends React.Component<ItemProps, ItemState> {
    render(): React.ReactNode {
        return (
            <Panel className='Item'>
                <TextButton text="ABC" onactivate={() => {
                    $.Msg("wtf")
                }}/>
            </Panel>
        )
    }
}

class Background extends React.Component {
    render(): React.ReactNode {
        return (
            <Panel style={{flowChildren: 'down'}} className='Background'>
                <Label style={{verticalAlign: 'middle', fontSize: '100px', horizontalAlign: 'center'}} text="抽卡" />
                <Panel style={{flowChildren: 'right'}}>
                    <Item name='test1'/>
                    <Item name='test2'/>
                    <Item name='test3'/>
                </Panel>
            </Panel>
        )
    }
}

$.Msg("test ui")

GameEvents.Subscribe('OnGachaEnter', ()=> {
    render(<Background />, $.GetContextPanel())
    $.Msg("OnGachaEnter")
})

GameEvents.Subscribe('OnGachaExit', () => {
    render(<></>, $.GetContextPanel())
    $.Msg("OnGachaExit")
})