import {ModalProps} from "../../../react/components/abstract/Modal"

export default interface ModalConfig extends ModalProps {
    content: React.ReactNode[]
    visible?: boolean
}