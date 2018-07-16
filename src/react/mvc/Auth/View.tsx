import Controller from "../Auth/Controller"
import * as React from "react"
import GoogleLogin from 'react-google-login'
import './styles'

interface Props {
    controller: Controller
}

interface State {
    token: string;
}

/**
 * View
 * Отвечает за представление страницы и
 * вызовы методов, описанных в контроллере
 */
export default class View extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {token: null};
    }

    render() {
        let responseGoogle = (response) => {
            this.setState({token: response.getAuthResponse().id_token});
        }
        return (
            <div>
                <GoogleLogin onSuccess={responseGoogle}
                             onFailure={responseGoogle}
                             clientId={"523383919868-ds7hpikgfa257dctt9nrojboul145paf.apps.googleusercontent.com"}
                             buttonText={"Login with Google"}
                             className="btnGoogle"/>
                <div>{this.state.token}</div>
            </div>
        )
    }
}

