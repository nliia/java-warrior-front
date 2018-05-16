import * as React from 'react'
import Components from '../../components'
import { Controller } from './Controller'
import AceEditor from 'react-ace'
import brace from 'brace'

import CardImage from '../../../assets/img/png/card.png'

import 'brace/mode/java';
import 'brace/theme/twilight';

import './styles.scss'
import b_ from '../../../utils/BEM';

interface Props {
    controller: Controller
}

interface State {

}

const game_ = b_('game'),
    facilities_ = b_('facilities')

/**
 * View
 * Отвечает за представление страницы и
 * вызовы методов, описанных в контроллере
 */
export default class View extends React.Component<Props, State> {

    showFacilities = () => {
        this.props.controller.props.modalsActions.show({
            name: 'facilities',
            title: 'Возможности',
            content: [
                <div className={facilities_()}>
                    { facilities.map(f => {
                        return (
                            <div className={facilities_({ elem: 'item' })}>
                                <p className={facilities_({ elem: 'title' })}>{f.title}</p>
                                <p className={facilities_({ elem: 'description' })}>{f.description}</p>
                            </div>
                        )
                    }) }
                </div>
            ],
            icon: CardImage,
            closable: true
        })
    }

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
                            onClick={this.showFacilities}
                            size="normal"
                        >
                            Возможности
                        </Components.Abstract.Button>
                    </header>
                    <div className={game_({ elem: 'container' })}>
                        <div className={game_({ elem: 'area', mix: { block: 'game-block' } })}>
                            <div className={game_({ elem: 'map' })}>

                            </div>
                            <div className={game_({ elem: 'logs' })}>
                                <p className={game_({ elem: 'message' })}>Шаг 1: Агент Николай сделал шаг вперед</p>
                                <p className={game_({ elem: 'message' })}>Шаг 2: Агент Николай получил удар заточкой в ребро</p>
                            </div>
                            <div className={game_({ elem: 'errors' })}>
                                <p className={game_({ elem: 'error' })}>Ошибка!</p>
                            </div>
                        </div>
                        <div className={game_({ elem: 'editor', mix: { block: 'game-block' } })}>
                            <AceEditor
                                mode="java"
                                theme="twilight"
                                fontSize={14}
                                width="100%"
                                height="100%"
                                enableLiveAutocompletion
                                enableBasicAutocompletion
                                value={this.props.controller.state.code}
                                onChange={this.props.controller.onChange}
                            />
                        </div>
                    </div>
                    <div className={game_({ elem: 'footer' })}>
                        <Components.Abstract.Button
                            type="active"
                            size="normal"
                            onClick={this.props.controller.onCompileCode}
                            disabled={!this.props.controller.state.code.length}
                        >
                            Компилировать
                        </Components.Abstract.Button>
                    </div>
                </div>
            </Components.Abstract.Loading>
            
        )
    }

}

const facilities = [
    { title: 'warrior.walk()', description: 'движение персонажа вперед' },
    { title: 'warrior.walk()', description: 'движение персонажа вперед с поклеточной проверкой на наличие врага' },
    { title: 'warrior.walk()', description: 'движение персонажа вперед' },
    { title: 'warrior.walk()', description: 'движение персонажа вперед' },
]