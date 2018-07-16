import * as React from 'react'
import WithClassNameProps from "../../../interfaces/props/WithClassNameProps"
import b_ from '../../../../utils/BEM'
import {BEMEntity} from 'rebem-classname'
import Abstract from '../../abstract'
import {RouteComponentProps, withRouter} from 'react-router'


import './styles'

interface Props extends WithClassNameProps, RouteComponentProps<any> {
}

interface State {

}

export class Header extends React.Component<Props> {


    render() {
        let header_ = b_('header')
        return (
            <header className={
                header_({mix: (this.props.classNames || []).map(c => ({className: c})) as BEMEntity})
            }>
                <Abstract.Logotype/>
                <ul className={header_({elem: 'menu'})}>
                    <Abstract.Button href="/about" size="small" type="plain">Предыстория</Abstract.Button>
                    {/*<Abstract.Button href="/login" size="small" type="plain">Войти</Abstract.Button>*/}
                    <LoginButton isLoginPage={location.pathname === '/login'}>{location.pathname}</LoginButton>
                </ul>
            </header>
        )
    }
}

function LoginButton(props) {
    const isLoginPage = props.isLoginPage;
    if (isLoginPage) {
        return <div></div>;
    }
    return <Abstract.Button href="/login" size="small" type="plain">Войти</Abstract.Button>;
}

export default withRouter(Header)