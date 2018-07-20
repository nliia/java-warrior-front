import Controller from "../Auth/Controller"
import * as React from "react"
import Components from '../../components'
import './styles'
import b_ from "../../../utils/BEM";

interface Props {
    controller: Controller
}

interface State {
}

const login_ = b_('login')

/**
 * View
 * Отвечает за представление страницы и
 * вызовы методов, описанных в контроллере
 */
export default class View extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Components.Abstract.Loading name="login">
                <div className={login_({elem: 'form'})}>
                    <Components.Abstract.Input
                        scale="small"
                        placeholder="Введите логин"
                        onChange={this.props.controller.onChangeLogin}
                        value={this.props.controller.state.login}/>
                    <br/>
                    <Components.Abstract.Input
                        inputType="password"
                        scale="small"
                        placeholder="Введите пароль"
                        onChange={this.props.controller.onChangePassword}
                        value={this.props.controller.state.password}/>
                    <br/>
                    <Components.Abstract.Button
                        type="active"
                        size="small"
                        onClick={this.props.controller.submitLogin}
                        disabled={!this.props.controller.state.login.length}
                    >
                        Войти
                    </Components.Abstract.Button>
                </div>
            </Components.Abstract.Loading>
        )
    }
}

