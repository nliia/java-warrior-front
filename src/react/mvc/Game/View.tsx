import * as React from 'react'
import Components from '../../components'
import Controller from './Controller'

import './styles.scss'
import b_ from '../../../utils/BEM';

interface Props {
    controller: Controller
}

interface State {

}

const game_ = b_('game')

/**
 * View
 * Отвечает за представление страницы и
 * вызовы методов, описанных в контроллере
 */
export default class View extends React.Component<Props, State> {

    render() {
        return (
            <Components.Abstract.Loading
                name="levelArea"
            >
                <div className={game_()}>
                    <header className={game_({ elem: 'header' })}>
                        <p className={game_({ elem: 'title' })}>Уровень {this.props.controller.state.levelInfo.levelNumber}</p>
                        <Components.Abstract.Button
                            type="primary"
                            size="normal"
                        >
                            Возможности
                        </Components.Abstract.Button>
                    </header>
                    <div className={game_({ elem: 'container' })}>
                        <div className={game_({ elem: 'area', mix: { block: 'game-block' } })}>
                        
                        </div>
                        <div className={game_({ elem: 'editor', mix: { block: 'game-block' } })}>
                        </div>                        
                    </div>
                    <div className={game_({ elem: 'footer' })}>
                        <Components.Abstract.Button
                            type="active"
                            size="normal"
                            disabled={this.props.controller.state.levelInfo.hasError}
                        >
                            Компилировать
                        </Components.Abstract.Button>
                    </div>
                </div>
            </Components.Abstract.Loading>
            
        )
    }

}
