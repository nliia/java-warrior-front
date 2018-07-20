import * as React from 'react'
import {RouteConfig as RC} from "react-router-config"

import MVC from '../react/mvc'
import {RouteComponentProps} from "react-router";

export default [
    {
        path: "/", component: MVC.MainPage.Controller, exact: true, nowrap: true
    },
    {
        path: "/choosing-hero", component: MVC.ChoosingHero.Controller
    },
    {
        path: "/game", component: MVC.Game.Controller
    },
    {
        path: '/about', component: MVC.AboutGame.Controller, nowrap: true
    },
    {
        path: '/login', component: MVC.Auth.Controller
    },
    {
        path: '/logout', component: MVC.MainPage.Controller, exact: true, nowrap: true
    }
] as RouteConfig[]

export interface RouteConfig extends RC {

    wrapper?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    nowrap?: boolean

}
