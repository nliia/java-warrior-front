import * as React from 'react'
import { RouteConfig as RC } from "react-router-config"
import Wrappers from './wrappers'

import MVC from '../react/mvc'

export default [
    {
        path: "/", component: MVC.MainPage.Controller, exact: true
    }
] as RouteConfig[]

export interface RouteConfig extends RC {

  wrapper?: React.ReactNode

}
