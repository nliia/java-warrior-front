import * as React from 'react'

import { Switch } from 'react-router-dom'
import {RouteConfig} from "react-router-config";
import Routes from "./Routes";
import {Route} from "react-router";


export function create () {

    function renderRoutes (routes: RouteConfig[]) {
        return routes.map((routeProps, index) => {
            return <Route {...routeProps} key={index} />
        })
    }

    return (
        <Switch>
            { renderRoutes(Routes) }
        </Switch>
    )
}