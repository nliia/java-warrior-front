import * as React from 'react'
import b_ from "../../../../utils/BEM"

import './styles.scss'
import Button from "../Button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReduxActions from '../../../../redux/actions'
import CloseImage from '../../../../assets/img/svg/close.svg'

import MProps from '../../../../redux/props/ModalsProps'

export interface ModalProps {
    name: string
    title?: string
    icon?: string
    buttonText?: string
    onButtonClick?: () => void
    closable?: boolean
}

interface Props extends ModalProps, MProps {

}

interface State {

}

let modal_ = b_('modal')

class Modal extends React.Component<Props, State> {

    onClose = () => {
        this.props.modalsActions.close(this.props.name)
    }

    render () {
        return (
            <div className="modal-wrapper">
                <div className={modal_()}>
                    { this.props.closable &&
                        <div onClick={this.onClose} className={modal_({ elem: 'close' })}><img src={CloseImage}/></div>
                    }
                    <p className={modal_({ elem: 'title' })}>{ this.props.title }</p>
                    <div className={modal_({ elem: 'icon' })}>
                        <img src={this.props.icon}/>
                    </div>
                    <div className={modal_({ elem: 'content' })}>
                        { this.props.children }
                    </div>
                    { this.props.buttonText &&
                        <div className={modal_({ elem: 'button' })}>
                            <Button
                                onClick={this.props.onButtonClick}
                                type="active"
                            >{ this.props.buttonText }</Button>
                        </div>
                    }
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        modalsActions: bindActionCreators(ReduxActions.Creators.Modals, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Modal as any)