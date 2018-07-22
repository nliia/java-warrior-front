import * as React from 'react'

import View from './View'

import Bomj from 'img/png/hero/swat.png'
import LevelInfoApi from "../../../api/LevelInfoApi";

interface Props {

}

interface State {
    heroes: ChooseItem[];
    choosedIndex: number;
    playerName: string
}

/**
 * Controller
 * Вся работа с сервером описывается  и производится здесь
 */
export default class Controller extends React.Component<Props, State> {

    constructor (props) {
        super(props);
        this.state = {
            heroes: [],
            choosedIndex: undefined,
            playerName: ''
        }
    }

    componentWillMount () {
        this.setState({
            heroes: [
                { name: 'Агент Николай', image: Bomj, nonactive: false },
                { name: 'В разработке', image: Bomj, nonactive: true },
                { name: 'В разработке', image: Bomj, nonactive: true },
                { name: 'В разработке', image: Bomj, nonactive: true },
            ]
        })
        this.getStage()
    }

    onChoose = (choosedIndex: number) => {
        this.setState({ choosedIndex })
    }

    onChangePlayerName = (e) => {
        this.setState({ playerName: e.target.value })
    }

    render () {
        return [
            <View controller={this} />
        ]
    }

    async getStage() {
        let token = localStorage.getItem('token')
        let stage = await LevelInfoApi.getStage(token);
        localStorage.setItem('stage',JSON.stringify(stage))
        console.log('STAGE' + stage)
    }

}

export interface ChooseItem {
    name: string
    image: string
    nonactive?: boolean
}
