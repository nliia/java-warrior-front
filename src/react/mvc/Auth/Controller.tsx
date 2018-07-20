import * as React from 'react'

import View from './View'
import LoadingController from "../../../@/loadings/LoadingController";
import AuthApi from "../../../api/AuthApi";
import Loading from "../../../@/loadings/Loading";
import {RouteComponentProps} from "react-router";
import WithClassNameProps from "../../interfaces/props/WithClassNameProps";

interface Props extends WithClassNameProps, RouteComponentProps<any> {

}

interface State {

}

/**
 * Controller
 * Вся работа с сервером описывается  и производится здесь
 */
interface State {
    token: string;
    login: string;
    password: string;
}

@LoadingController
export default class Controller extends React.Component<Props, State> {
    defaultState: State = {
        token: "",
        login: "",
        password: ""
    }

    constructor(props) {
        super(props);
        this.state = {...this.defaultState}
    }

    @Loading('login', 'Авторизация...')
    async login(login: string, password: string) {
        let userInfo = await AuthApi.auth(login, password);
        localStorage.setItem("token", userInfo.token);
        localStorage.setItem("username", userInfo.login);
        localStorage.setItem("userLevel", userInfo.level.toString());
        console.log("TOEKN AAA" + userInfo.token);
        this.props.history.push("/choosing-hero");

    }

    submitLogin = async () => {
        await this.login(this.state.login, this.state.password);
    }
    onChangeLogin = (e) => {
        this.setState({login: e.target.value})
    }
    onChangePassword = (e) => {
        this.setState({password: e.target.value})
    }

    render() {
        return [
            <View controller={this}/>
        ]
    }

}