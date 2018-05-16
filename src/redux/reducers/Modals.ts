import Actions from '../actions'
import IAction from '../actions/interfaces/IAction';
import ModalConfig from "../actions/interfaces/ModalConfig";

const Types = Actions.Types.Modals

export interface ModalsStore {

    [key:string] : ModalConfig

}

export default (state: ModalsStore = {}, action: IAction) => {

    let { type, payload } = action

    switch (type) {
        case Types.SHOW:
            return { ...state, [payload.name]: { ...payload, visible: true } }
        case Types.CLOSE:
            console.log(state, payload.name)
            state[payload.name].visible = false;
            return { ...state }
        default:
            return {...state}
    }

}
