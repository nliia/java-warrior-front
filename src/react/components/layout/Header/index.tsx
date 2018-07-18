import * as React from 'react'
import WithClassNameProps from "../../../interfaces/props/WithClassNameProps"
import b_ from '../../../../utils/BEM'
import {BEMEntity} from 'rebem-classname'
import Abstract from '../../abstract'
import {RouteComponentProps, withRouter} from 'react-router'


import './styles'
import GoogleLogin from "react-google-login";
import CompilingApi from "../../../../api/CompilingApi";
import Loading from "../../../../@/loadings/Loading";
import Info from "../../../../Info";
import Components from '../../../components'


interface Props extends WithClassNameProps, RouteComponentProps<any> {
}

interface State {
    token: string
}

export class Header extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {token: null};
    }

    async login() {
        console.log('  ddddddddddddddddddddddddddddddddddd    AAAAAAAAAAAAAAAAAAAAAAAAA')

        let userInfo = await CompilingApi.auth()
        this.map(userInfo)
        console.log(Info.name + '      AAAAAAAAAAAAAAAAAAAAAAAAA')
    }

    map(userInfo) {
        Info.email = userInfo.email
        Info.level = userInfo.level
        Info.name = userInfo.name
        Info.token = userInfo.token
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
                    {/*<Abstract.Button href="/login" size="small" type="plain">Войти</Abstract.Button>*/}
                    <Components.Abstract.Loading
                        name="auth"
                    >
                        <Abstract.Button onClick={this.login} size="small" type="plain">Войти через Google</Abstract.Button>
                    </Components.Abstract.Loading>
                </ul>
            </header>
        )
    }
}


export default withRouter(Header)