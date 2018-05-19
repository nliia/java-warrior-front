import * as React from 'react'
import { RouteConfig as RC } from "react-router-config"
import Wrappers from './wrappers'

import MVC from '../react/mvc'
import { RouteComponentProps } from "react-router";

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
    }
] as RouteConfig[]

export interface RouteConfig extends RC {

    wrapper?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    nowrap?: boolean

}
