import * as React from 'react'
import Components from '../../components'
import Controller from './Controller'

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

    render() {
        return []
    }

}