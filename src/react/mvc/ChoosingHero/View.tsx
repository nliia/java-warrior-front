import * as React from 'react'
import Components from '../../components'
import Controller, { ChooseItem } from './Controller'

import b_ from '../../../utils/BEM';


import './styles.scss'

interface Props {
    controller: Controller
}

interface State {

}

const choosingHero_ = b_('choosingHero'),
    chooses_ = b_('chooses');

/**
 * View
 * Отвечает за представление страницы и
 * вызовы методов, описанных в контроллере
 */
export default class View extends React.Component<Props, State> {

    renderChooseItem = (item: ChooseItem, index: number) => {
        return (
            <div
                className={chooses_({
                    elem: 'item',
                    mods: {
                        nonactive: item.nonactive,
                        choosed: this.props.controller.state.choosedIndex == index
                    }
                })}
                onClick={() => !item.nonactive && this.props.controller.onChoose(index)}
                key={index}
            >
                <img className={chooses_({ elem: 'image' })} src={item.image} alt={item.name}/>
                <p className={chooses_({ elem: 'title' })}>{item.name}</p>
            </div>
        )
    }

    renderChooses = (chooses: ChooseItem[]) => {
        return chooses.map((item, index) => this.renderChooseItem(item, index))
    }

    render() {

        return (
          <div className={choosingHero_()}>
              <h2 className={choosingHero_({ elem: 'head' })}>Выберите персонажа</h2>
              <ul className={choosingHero_({ elem: 'chooses', mix: { block: chooses_() } })}>
                  { this.renderChooses(this.props.controller.state.heroes) }
              </ul>
              <div className={choosingHero_({ elem: 'form' })}>
                  <Components.Abstract.Input
                      placeholder="Введите имя персонажа"
                      onChange={this.props.controller.onChangePlayerName}
                      value={this.props.controller.state.playerName}
                  />
                  <Components.Abstract.Button
                      type="active"
                      href="/game"
                      disabled={
                          this.props.controller.state.choosedIndex == undefined
                          || this.props.controller.state.playerName.length == 0
                      }
                  >
                      Начать игру
                  </Components.Abstract.Button>
              </div>
          </div>
        )
    }

}
