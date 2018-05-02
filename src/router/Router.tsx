import * as React from 'react'

import { Switch, Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {RouteConfig} from "./Routes"
import Routes from "./Routes"
import DefaultWrapper from './wrappers/Default'
import RouterTransition from '../react/mware/RouterTransition'


export function create () {

    function renderRoutes (routes: RouteConfig[]) {
        return routes.map((routeProps, index) => {
            return (
                routeProps.wrapper ?
                  React.createElement(routeProps.wrapper as any, {
                    ...routeProps,
                    key: index
                  })
                 : <DefaultWrapper {...routeProps} key={index} />
            )
        })
    }

    return (
        <RouterTransition>
            {
                location => (
                    <Switch
                        location={location}
                    >
                        { renderRoutes(Routes) }
                    </Switch>
                )
            }
        </RouterTransition>
    )
}
