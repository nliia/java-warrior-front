import ModalConfig from '../interfaces/ModalConfig'
import IAction from "../interfaces/IAction";

import * as Types from '../types/Modals'


export interface ModalsActions {
    show: (modalConfig: ModalConfig) => void
    close: (name: string) => void
}

export default {

    show (modalConfig: ModalConfig) : IAction {
        return {
            type: Types.SHOW,
            payload: modalConfig
        }
    },

    close (name: string) : IAction {
        return {
            type: Types.CLOSE,
            payload: { name }
        }
    }

}