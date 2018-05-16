import * as React from 'react'

import View from './View'
import Loading from '../../../@/loadings/Loading';
import LoadingController from '../../../@/loadings/LoadingController';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReduxActions from '../../../redux/actions'
import ModalsProps from "../../../redux/props/ModalsProps";

import PistolImage from '../../../assets/img/png/pistol.png'
import CompilingApi from "../../../api/CompilingApi";

interface Props extends ModalsProps {
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
export class Controller extends React.Component<Props, State> {

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
        this.setState({ code })
    }

    onCompileCode = async () => {
        await CompilingApi.compile(this.state.code)
    }

    onStartCoding = () => {
        this.props.modalsActions.close('levelInfo');
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

        this.props.modalsActions.show({
            name: 'levelInfo',
            title: `Уровень ${levelInfo.levelNumber}`,
            icon: PistolImage,
            buttonText: 'Погнали кодить!',
            onButtonClick: this.onStartCoding,
            content: [
                <p style={{ textAlign: 'center', fontSize: '20px' }}>
                    Первой миссией является попадание внутрь небольшого наркопритона в черте города для нахождения улик и зацепок. Попасть внутрь решается через запасной ход
                </p>
            ]
        })

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

const mapDispatchToProps = dispatch => {
    return {
        modalsActions: bindActionCreators(ReduxActions.Creators.Modals, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Controller)

interface LevelInfo {

    levelNumber?: number;
    hasError?: boolean;

}
