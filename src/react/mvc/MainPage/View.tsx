import * as React from 'react'
import Components from '../../components'
import Controller from './Controller'
import Parallax from 'react-parallax-mousemove'

import BgBottom from 'img/svg/bg-bottom.svg'
import BgBlood from 'img/svg/bg-blood.svg'
import BgSpikes from 'img/png/bg-spikes.png'


import './styles.scss'
import b_ from "../../../utils/BEM"

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
                    <h1 className={mainHero_({ elem: 'head' })}>
                        Java Warrior
                        <span className={mainHero_({ elem: 'release' })}>Beta</span>
                    </h1>
                    <p className={mainHero_({ elem: 'description' })}>
                        Пиши код, собирай улики и отыщи <br/> настоящего наркобарона
                    </p>
                    <div className={mainHero_({ elem: 'buttons' })}>
                        <Components.Abstract.Button
                            href="/choosing-hero"
                        >
                            Начать игру
                        </Components.Abstract.Button>
                        <Components.Abstract.Button
                            href="/about"
                        >
                            Читать предысторию
                        </Components.Abstract.Button>
                    </div>
                </div>
                <Parallax
                    containerStyle={{
                        position: 'absolute',
                        zIndex: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        overflow: 'hidden'
                    }}
                >
                    <Parallax.Layer
                        layerStyle={{
                            background: `url(${BgBottom})`,
                            position: 'absolute',
                            width: '100%',
                            height: '230px',
                            zIndex: 3
                        }}
                        config={{
                            xFactor: 0,
                            yFactor: .01,
                        }}
                    />
                    <Parallax.Layer
                        layerStyle={{
                            background: `url(${BgBlood}) no-repeat`,
                            backgroundPosition: '50%',
                            position: 'absolute',
                            transform: 'translate(30%, 0)',
                            height: 852,
                            width: 914,
                            zIndex: 2
                        }}
                        config={{
                            xFactor: .04,
                            yFactor: .1,
                        }}
                    />
                    <Parallax.Layer
                        layerStyle={{
                            background: `url(${BgSpikes}) no-repeat`,
                            backgroundSize: 'cover',
                            backgroundPosition: '50%',
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            zIndex: 1
                        }}
                        config={{
                            xFactor: -.04,
                            yFactor: .01,
                        }}
                    />
                </Parallax>
            </div>
        )
    }

}
