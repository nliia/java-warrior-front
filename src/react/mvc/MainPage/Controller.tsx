import * as React from 'react'

import View from './View'


interface Props {

}

interface State {

}

/**
 * Controller
 * Вся работа с сервером описывается  и производится здесь
 */
export default class Controller extends React.Component<Props, State> {
    render () {
        return [
            <View controller={this} />
        ]
    }
}