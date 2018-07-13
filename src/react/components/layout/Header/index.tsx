import * as React from 'react'
import WithClassNameProps from "../../../interfaces/props/WithClassNameProps"
import b_ from '../../../../utils/BEM'
import {BEMEntity} from 'rebem-classname'
import Abstract from '../../abstract'

import './styles'

interface Props extends WithClassNameProps {
}

interface State {

}

export default class Header extends React.Component<Props, State> {

    render() {
        let header_ = b_('header')

        return (
            <header className={
                header_({mix: (this.props.classNames || []).map(c => ({className: c})) as BEMEntity})
            }>
                <Abstract.Logotype/>
                <ul className={header_({elem: 'menu'})}>
                    <Abstract.Button href="/about" size="small" type="plain">Предыстория</Abstract.Button>
                    <Abstract.Button href="/login" size="small" type="plain">Войти</Abstract.Button>
                </ul>
            </header>
        )

    }

}
