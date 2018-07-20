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
    logout = () => {
        localStorage.removeItem("token");
        this.props.history.push('/')
    }
    render() {
        let header_ = b_('header')
        return (
            <header className={
                header_({mix: (this.props.classNames || []).map(c => ({className: c})) as BEMEntity})
            }>
                <Abstract.Logotype/>
                <ul className={header_({elem: 'menu'})}>
                    <Abstract.Button href="/about" size="small" type="plain">Предыстория</Abstract.Button>
                    <LoginButton isLoginPage={location.pathname === '/login'}
                                 func={this.logout}>{location.pathname}</LoginButton>
                </ul>
            </header>
        )
    }
}

function LoginButton(props) {
    const isLoginPage = props.isLoginPage;
    if (isLoginPage) {
        return <Abstract.Button onClick={() => this.props.history.push('/signIn')}
                                size="small" type="plain">Зарегистрироваться</Abstract.Button>;
    }
    return <Abstract.Button onClick={props.func}
                            size="small" type="plain">Выйти</Abstract.Button>;
}


export default withRouter(Header)