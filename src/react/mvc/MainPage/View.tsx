import * as React from 'react'
import Components from '../../components'
import Controller from './Controller'

import './styles.scss'
import b_ from "../../../utils/BEM"
import {setInterval} from "timers";

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

    constructor (props) {
        super(props);
    }

    render() {
        let mainHero_ = b_('mainHero')

        return (
            <div className={mainHero_()}>
                <div className={mainHero_({ elem: 'info' })}>
                    <h1 className={mainHero_({ elem: 'head' })}>Java Warrior</h1>
                    <p className={mainHero_({ elem: 'description' })}>
                        Пиши код, собирай улики и отыщи <br/> настоящего наркобарона
                    </p>
                    <div className={mainHero_({ elem: 'buttons' })}>
                        <Components.Abstract.Button
                            href="/choosing-hero"
                        >
                            Начать игру
                        </Components.Abstract.Button>
                        <Components.Abstract.Button>
                            Читать предысторию
                        </Components.Abstract.Button>
                    </div>
                </div>
                <div className={mainHero_({
                    elem: 'hero'
                })}>

                </div>
            </div>
        )
    }

}
