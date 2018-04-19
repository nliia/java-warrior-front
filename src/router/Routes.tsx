import * as React from 'react'
import {RouteConfig} from "react-router-config";

import MVC from '../react/mvc'

export default [
    {
        path: "/", component: MVC.Hello.Controller, exact: true
    }
] as RouteConfig[]