import * as React from 'react'
import { RouteConfig as RC } from "react-router-config"
import Wrappers from './wrappers'

import MVC from '../react/mvc'
import { RouteComponentProps } from "react-router";

export default [
    {
        path: "/", component: MVC.MainPage.Controller, exact: true
    },
    {
        path: "/choosing-hero", component: MVC.ChoosingHero.Controller, exact: true 
    },
    {
        path: "/game", component: MVC.Game.Controller, exact: true
    }
] as RouteConfig[]

export interface RouteConfig extends RC {

    wrapper?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>

}
