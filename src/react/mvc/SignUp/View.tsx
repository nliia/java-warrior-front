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

const login_ = b_('signin')

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
            <Components.Abstract.Loading name="signin">

                <div className={login_({elem: 'form'})}>
                    <Components.Abstract.Input
                        placeholder="Введите логин"
                        onChange={this.props.controller.onChangeLogin}
                        value={this.props.controller.state.login}/>
                    <Components.Abstract.Input
                        placeholder="Введите пароль"
                        onChange={this.props.controller.onChangePassword}
                        value={this.props.controller.state.password}/>
                    <Components.Abstract.Button
                        type="active"
                        size="normal"
                        onClick={this.props.controller.submitLogin}
                        disabled={!this.props.controller.state.login.length}
                    >
                        Зарегистрироваться
                    </Components.Abstract.Button>
                </div>
            </Components.Abstract.Loading>
        )
    }
}

