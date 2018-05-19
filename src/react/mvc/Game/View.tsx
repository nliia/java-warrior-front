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
import Map from "../../components/abstract/Map";

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
                    { facilities.map((f,i) => {
                        return (
                            <div key={i} className={facilities_({ elem: 'item' })}>
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
                        <p className={game_({ elem: 'title' })}>Уровень {this.props.controller.state.levelInfo.number}</p>
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
                                <Map
                                    actions={this.props.controller.state.compilingInfo.actions}
                                    scheme={this.props.controller.state.levelInfo.mapScheme}
                                />
                            </div>
                            <div className={game_({ elem: 'logs' })}>
                                {this.props.controller.state.levelInfo.messages.map((message, index) => {
                                    return <p key={index} className={game_({ elem: 'message' })}>Шаг {index}: {message}</p>
                                })}
                            </div>
                            <div className={game_({ elem: 'errors' })}>
                                <div className={game_({ elem: 'error' })}>
                                    <pre>
                                        {this.props.controller.state.compilingInfo.errorDescription}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        <Components.Abstract.Loading name="editor">
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
                        </Components.Abstract.Loading>
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
    { title: 'walk()', description: 'Движение персонажа вперед' },
    { title: 'attack()', description: 'Атаковать следующую клетку' },
    { title: 'jump()', description: 'Прыжок через препятствие' },
    { title: 'rest()', description: 'Передохнуть' },
    { title: 'health()', description: 'Подлечить здоровье' },
    { title: 'enemyAhead()', description: 'Проверка на наличие врага на следующей клетке' },
    { title: 'spikesAhead()', description: 'Проверка на наличие шипов на следующей клетке' },
]