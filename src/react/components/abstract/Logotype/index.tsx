import * as React from 'react'
import b_ from '../../../../utils/BEM'
import { BEMEntity } from 'rebem-classname'
import WithClassNameProps from '../../../interfaces/props/WithClassNameProps'

import { withRouter, RouteComponentProps } from 'react-router-dom'

import './styles.scss'

interface Props extends WithClassNameProps, RouteComponentProps<any> {

}

let logotype_ = b_('logotype')


class Logotype extends React.Component<Props> {

    render () {
        return (
            <div
                className={logotype_({
                    mix: (this.props.classNames || []).map(className => ({ className })) as BEMEntity
                })}
                onClick={() => this.props.history.push('/')}
            >
                <div className={logotype_({ elem: 'square' })}/>
                <span className={logotype_({ elem: 'title' })}>JW</span>
            </div>
        )
    }

}

export default withRouter(Logotype)
