import * as React from 'react'

import View from './View'
import Loading from '../../../@/loadings/Loading';
import LoadingController from '../../../@/loadings/LoadingController';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReduxActions from '../../../redux/actions'
import ModalsProps from "../../../redux/props/ModalsProps";

import PistolImage from '../../../assets/img/png/pistol.png'
import StageCompleteImage from '../../../assets/img/png/stage-completed.png'
import StageFailedImage from '../../../assets/img/png/stage-failed.png'
import CompilingApi, {CompileResponse} from "../../../api/CompilingApi";
import {MapScheme} from "../../components/abstract/Map";

interface Props extends ModalsProps {
    name
}

interface State {
    levelInfo: LevelInfo
    compilingInfo: CompileResponse
    code: string
    tryingNumber?: number
    allAnimationsEnd: boolean
}

/**
 * Controller
 * Вся работа с сервером описывается  и производится здесь
 */
@LoadingController
export class Controller extends React.Component<Props, State> {

    defaultState : State = {
        levelInfo: {
            number: 1,
            description: 'Первой миссией является попадание внутрь небольшого наркопритона в черте города для нахождения улик и зацепок. Попасть внутрь решается через запасной ход',
            icon: PistolImage,
            mapScheme: [
                MapScheme.hero,
                MapScheme.thorns,
                MapScheme.empty,
                MapScheme.enemy,
                MapScheme.empty
            ],
            messages: [ 'Начало игры' ]
        },
        compilingInfo: new CompileResponse(),
        code: "",
        allAnimationsEnd: true
    }

    constructor (props) {
        super(props);
        this.state = {...this.defaultState, tryingNumber: 0}
    }

    closeModal = (name: string) => {
        this.props.modalsActions.close(name);
    }

    @Loading('editor', 'Компиляция...')
    async compileCode (code: string) {
        let compilingInfo = await CompilingApi.compile(code);
        let { levelInfo, tryingNumber } = this.state;
        tryingNumber++
        if (compilingInfo.message) {
            levelInfo.messages = [...levelInfo.messages, compilingInfo.message];
        }
        this.setState({ levelInfo })
        // if (compilingInfo.stageCompleted) {
        //     this.openStageCompletedModal();
        // }
        // if (compilingInfo.message == "Hero died!") {
        //     if (tryingNumber == 10) {
        //         this.openLooserModal();
        //     } else {
        //         this.openHeroDiedModal();
        //     }
        // }
        console.log(compilingInfo)
        this.setState({ compilingInfo, tryingNumber })
    }

    onChange = (code: string) => {
        this.setState({ code })
    }

    onCompileCode = async () => {
        await this.compileCode(this.state.code);
    }

    onStartAgain = () => {
        location.reload();
    }

    onAllAnimationEnd = (value:boolean) => {
        this.setState({ allAnimationsEnd: value })
    }

    @Loading('levelArea', 'Загрузка игрового уровня...')
    async componentDidMount () {
        let { levelInfo } = this.state;

        this.props.modalsActions.show({
            name: 'levelInfo',
            title: `Уровень ${levelInfo.number}`,
            icon: levelInfo.icon,
            buttonText: 'Погнали кодить!',
            onButtonClick: () => this.closeModal('levelInfo'),
            content: [
                <p style={{ textAlign: 'center', fontSize: '20px' }}>
                    {levelInfo.description}
                </p>
            ]
        })
    }

    openHeroDiedModal () {
        this.props.modalsActions.show({
            name: 'stageFailed',
            title: `Ну, вот…`,
            icon: StageFailedImage,
            buttonText: 'Попробовать снова',
            onButtonClick: () => this.onStartAgain(),
            content: [
                <p style={{ textAlign: 'center', fontSize: '20px' }}>
                    Компиляция пошла не по плану, ваш персонаж сдох…
                </p>
            ]
        })
    }

    openStageCompletedModal () {
        this.props.modalsActions.show({
            name: 'stageCompleted',
            title: `Йеее, бой!`,
            icon: StageCompleteImage,
            buttonText: 'Следующий уровень',
            onButtonClick: () => location.reload(),
            content: [
                <p style={{ textAlign: 'center', fontSize: '20px' }}>
                    Успех есть — можно поесть!
                </p>
            ]
        })
    }

    openLooserModal () {
        this.props.modalsActions.show({
            name: 'youLooser',
            title: `Ну, вот…`,
            icon: StageFailedImage,
            buttonText: 'Попробовать снова',
            onButtonClick: () => {
                this.onStartAgain();
                this.setState({ tryingNumber: 0 })
            },
            content: [
                <p style={{ textAlign: 'center', fontSize: '20px' }}>
                    Ну ты и лошара
                </p>
            ]
        })
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

    number?: number
    description?: string
    icon: string
    mapScheme: MapScheme[]
    messages: string[]

}
