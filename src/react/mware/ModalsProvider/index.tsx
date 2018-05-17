import * as React from 'react'
import {connect} from "react-redux";
import {Reducers} from "../../../redux/reducers";
import ModalsProps from "../../../redux/props/ModalsProps";
import {bindActionCreators} from "redux";
import ReduxActions from '../../../redux/actions'
import Modal from "../../components/abstract/Modal";
import ModalConfig from "../../../redux/actions/interfaces/ModalConfig";

interface Props extends ModalsProps {

}

interface State {

}

class ModalsProvider extends React.Component<Props,State> {

    render () {
        let prepared = [];
        Object.keys(this.props.modalsState).map(key => {
            prepared.push(this.props.modalsState[key])
        })
        let modals = prepared.filter((m : ModalConfig) => m.visible)
            .map((modalConfig : ModalConfig, index) => {
                return (
                    <Modal
                        {...modalConfig}
                        key={modalConfig.name + index}
                    >
                        { modalConfig.content.map((v, i) => {
                            return React.cloneElement(v as any, {
                                key: i
                            })
                        }) }
                    </Modal>
                )
            })
        return [
            this.props.children,
            modals
        ]
    }

}

const mapStateToProps = (reducers: Reducers) => {
    return {
        modalsState: reducers.Modals
    }
}

const mapDispatchToProps = dispatch => {
    return {
        modalsActions: bindActionCreators(ReduxActions.Creators.Modals, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalsProvider as any)