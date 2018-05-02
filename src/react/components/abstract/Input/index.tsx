import * as React from 'react'
import b_ from "../../../../utils/BEM"
import WithClassNameProps from "../../../interfaces/props/WithClassNameProps"
import { BEMEntity } from 'rebem-classname'

import './styles.scss'
import {excludeKeys} from "../../../../utils/ObjectHelper";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, WithClassNameProps {
    type?: InputType
    scale?: InputSize
}

let input_ = b_('input')

export default class Input extends React.Component<Props> {

    render () {
        let { className, classNames } = this.props;

        return (
            <input
                {...excludeKeys(this.props, 'type', 'scale')}
                type="text"
                className={input_({
                    mix: (classNames || []).concat([className]).map(className => ({ className })) as BEMEntity,
                    mods: {
                        type: this.props.type || 'primary',
                        size: this.props.scale || 'normal'
                    }
                })}
            />
        )
    }

}

type InputType = "primary" | 'plain' | 'outlined';
type InputSize = 'small' | 'normal' | 'large';
