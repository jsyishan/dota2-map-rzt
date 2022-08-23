import React from 'react';
import { render } from '@demon673/react-panorama';

function HeroRow({ heroName }: { heroName: string }) {
    return (
        <Panel style={{ flowChildren: 'right' }}>
            <DOTAHeroImage heroimagestyle='icon' heroname={heroName} />
            <Label style={{ marginLeft: '5px' }} localizedText={heroName} />
        </Panel>
    )
}

function Gacha() {
    return (
        <Panel style={{ border: '10px solid red', flowChildren: 'down' }}>
            <TextButton
                className='TestButon'
                text="test button"
                style={{ fontSize: '100px' }}
                onactivate={(btn) => {
                    $.Msg("cnm")
                }}
            />
            <HeroRow heroName="npc_dota_hero_abaddon" />
            <HeroRow heroName="npc_dota_hero_abyssal_underlord" />
            <HeroRow heroName="npc_dota_hero_alchemist" />
        </Panel>
    )
}

render(<Gacha />, $.GetContextPanel())
$.Msg("test ui")
