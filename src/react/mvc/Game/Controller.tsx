import * as React from 'react'

import View from './View'
import Loading from '../../../@/loadings/Loading';
import LoadingController from '../../../@/loadings/LoadingController';
import LoadingsProps from '../../../redux/props/LoadingsProps';

interface Props {
    name
}

interface State {
    levelInfo: LevelInfo
    code: string
}

/**
 * Controller
 * Вся работа с сервером описывается  и производится здесь
 */
@LoadingController
export default class Controller extends React.Component<Props, State> {

    constructor (props) {
        super(props);
        this.state = {
            levelInfo: {
                hasError: true
            },
            code: ""
        }
    }

    onChange = (code: string) => {
        console.log(code)
        this.setState({ code })
    }

    @Loading('levelArea', 'Загрузка игрового уровня...')
    async componentDidMount () {
        let { levelInfo } = this.state;
        let levelNumber : number = await new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 3000)
        })
        levelInfo.levelNumber = 1;
        this.setState({ levelInfo })

        setTimeout(() => {
            levelInfo.hasError = false;
            this.setState({ levelInfo })
        }, 5000)
    }


    render () {
        return [
            <View controller={this} />
        ]
    }

}

interface LevelInfo {

    levelNumber?: number;
    hasError?: boolean;

}
