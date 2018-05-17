import * as React from 'react'
import b_ from "../../../../utils/BEM";

import './styles.scss'

import HeroImage from '../../../../assets/img/png/bomj.png'
import ThornsImage from '../../../../assets/img/png/thorns.png'
import EnemyImage from '../../../../assets/img/png/enemy.png'

interface Props {
    scheme: MapScheme[]
    actions: ActionType[]
}

interface State {
}

export enum MapScheme {
    hero,
    enemy,
    field,
    thorns
}

export type ActionType = "MOVE_FORWARD" | "SHOOT" | "FLIP_FORWARD"

let map_ = b_('game-map')

export default class Map extends React.Component<Props, State> {

    getTag (entity: MapScheme) {
        return MapScheme[entity];
    }

    getImage (entity: MapScheme) {
        switch (entity) {
            case MapScheme.enemy:
                return EnemyImage;
            case MapScheme.thorns:
                return ThornsImage;
            case MapScheme.hero:
                return HeroImage;
        }

    }

    wrapImage (image: string, entity: MapScheme, index: number) {
        return (
            <div key={index} className={map_({ elem: 'field', mods: { [this.getTag(entity)]: true } })}>
                <img src={image}/>
            </div>
        )
    }

    render () {
        return (
            <div className={map_()}>
                <div className={map_({ elem: 'fields' })}>
                    {this.props.scheme.map((ent, index) => {
                        return this.wrapImage(this.getImage(ent), ent, index)
                    })}
                </div>
            </div>
        )
    }


}