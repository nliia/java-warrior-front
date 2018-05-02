import * as React from 'react'
import b_ from "../../../../utils/BEM"
import WithClassNameProps from "../../../interfaces/props/WithClassNameProps"
import { BEMEntity } from 'rebem-classname'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import './styles.scss'
import {excludeKeys} from "../../../../utils/ObjectHelper";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, WithClassNameProps, RouteComponentProps<any> {
    type?: ButtonType
    size?: ButtonSize
    href?: string
}

class Button extends React.Component<Props> {

    onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.href) {
            this.props.history.push(this.props.href);
            return;
        } else if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render () {
        let { className, classNames } = this.props;
        let button_ = b_('button')

        return (
            <button
                {...excludeKeys(this.props, 'type', 'size', 'staticContext', 'match', 'history', 'location')}
                onClick={this.onClick}
                className={button_({
                    mix: (classNames || []).concat([className]).map(className => ({ className })) as BEMEntity,
                    mods: {
                        type: this.props.type || 'primary',
                        size: this.props.size || 'normal'
                    }
                })}
            >
                {this.props.children}
            </button>
        )
    }

}


export default withRouter(Button)

type ButtonType = "primary" | 'plain' | 'outlined' | 'active';
type ButtonSize = 'small' | 'normal' | 'large';
