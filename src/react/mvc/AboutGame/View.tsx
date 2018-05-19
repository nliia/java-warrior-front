import * as React from 'react'
import Components from '../../components'
import Controller from './Controller'
import Parallax from 'react-parallax-mousemove'

import BgAK from 'img/png/bg-ak.png'
import BgKnife from 'img/png/bg-knife.png'


import './styles.scss'
import b_ from "../../../utils/BEM"

interface Props {
    controller: Controller
}

interface State {
}

let about_ = b_('about')

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
        return (
            <div className={about_()}>
                <div className={about_({ elem: 'info' })}>
                    <h1 className={about_({ elem: 'head' })}>
                        <span style={{ color: '#ff863d' }}>Java</span>
                        <span style={{ color: 'white' }}>Warrior</span>
                    </h1>
                    <div className={about_({ elem: 'content' })}>
                        <p>
                            Главный персонаж работает в подразделении S.W.A.T. обычным спецназовцем, и его отправляют на задание, финальной целью которого является поимка наркобарона.
                            Однако, для того чтобы достичь финальной цели ему предстоит сначала пройти множество разных миссий, которые, как раз-таки, и укажут ему путь к наркобарону.
                        </p>
                        <p>
                            Первой миссией является попадание внутрь небольшого наркопритона в черте города для нахождения улик и зацепок. Попасть внутрь решается через запасной ход, но при попытке зайти обнаруживается, что в коридоре стоит охранник, с которым нужно разобраться по-мужски (написав код, конечно же).
                        </p>
                    </div>
                </div>
                <div className={about_({ elem: 'parallax' })}>
                    <Parallax
                        containerStyle={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0
                        }}
                    >
                        <Parallax.Layer
                            layerStyle={{
                                background: `url(${BgKnife}) no-repeat`,
                                backgroundSize: 'contain',
                                position: 'absolute',
                                width: 185,
                                height: 581,
                                transform: 'translate(0, -450px)',
                                zIndex: 3
                            }}
                            config={{
                                yFactor: .1,
                            }}
                        />
                        <Parallax.Layer
                            layerStyle={{
                                background: `url(${BgAK}) no-repeat`,
                                backgroundSize: 'contain',
                                backgroundPosition: '50%',
                                position: 'absolute',
                                height: 852,
                                width: 450,
                                zIndex: 2,
                                transform: 'translate(185px, 50px)'
                            }}
                            config={{
                                yFactor: .2,
                            }}
                        />
                    </Parallax>
                </div>
            </div>
        )
    }

}
