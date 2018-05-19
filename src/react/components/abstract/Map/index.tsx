import * as React from 'react'
import b_ from "../../../../utils/BEM";

import './styles.scss'

import * as $ from 'jquery'
import {Action} from "../../../../api/CompilingApi";

interface Props {
    scheme: MapScheme[]
    actions: Action[]
}

interface State {
}

export enum MapScheme {
    hero,
    enemy,
    empty,
    thorns
}

export enum HeroState {

}

let map_ = b_('game-map')

export default class Map extends React.Component<Props, State> {

    getTag (entity: MapScheme) {
        return MapScheme[entity];
    }

    wrapImage (entity: MapScheme, index: number) {
        return (
            <div id={entity == MapScheme.hero ? "hero" : undefined} key={index} className={map_({
                elem: 'field',
                mods: {
                    [this.getTag(entity)]: true,
                }
            })}></div>
        )
    }

    render () {
        return (
            <div className={map_()}>
                <div className={map_({ elem: 'fields' })}>
                    {this.props.scheme.map((ent, index) => {
                        return this.wrapImage(ent, index)
                    })}
                </div>
            </div>
        )
    }


}