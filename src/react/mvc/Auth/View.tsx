import Controller from "../Auth/Controller"
import * as React from "react"
import GoogleLogin from 'react-google-login'
import './styles'

interface Props {
    controller: Controller
}

interface State {
}

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

        let responseGoogle = (response) => {
            console.log(response);
        }

        return (
            <div>
                <GoogleLogin onSuccess={responseGoogle}
                             onFailure={responseGoogle}
                             clientId={"523383919868-ds7hpikgfa257dctt9nrojboul145paf.apps.googleusercontent.com"}
                             buttonText={"Login with Google"}
                             className="btnGoogle"/>
            </div>
        )
    }
}