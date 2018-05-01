import * as React from 'react'

import { Switch } from 'react-router-dom'
import {RouteConfig} from "./Routes"
import Routes from "./Routes"
import {Route} from "react-router"
import DefaultWrapper from './wrappers/Default'


export function create () {

    function renderRoutes (routes: RouteConfig[]) {
        return routes.map((routeProps, index) => {
            return routeProps.wrapper ?
              React.createElement(routeProps.wrapper as any, {
                ...routeProps,
                key: index
              })
             : <DefaultWrapper {...routeProps} key={index} />
        })
    }

    return (
        <Switch>
            { renderRoutes(Routes) }
        </Switch>
    )
}
