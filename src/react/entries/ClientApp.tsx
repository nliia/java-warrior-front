import * as React from 'react'
import AppProvider from "../mware/AppProvider";
import * as Router from "../../router/Router";
import {BrowserRouter} from "react-router-dom";

export default class App extends React.Component {

    render () {
        return (
            <AppProvider>
                <BrowserRouter>
                    {Router.create()}
                </BrowserRouter>
            </AppProvider>
        )
    }

}