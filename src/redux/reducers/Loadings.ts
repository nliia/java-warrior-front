import Actions from '../actions'
import IAction from '../actions/interfaces/IAction';

const Types = Actions.Types.Loadings

export interface LoadingsStore {

    [key:string] : {
        value: boolean
        message: string
    }

}

export default (state: LoadingsStore = {}, action: IAction) => {

    let { type, payload } = action

    switch (type) {
        case Types.SET:
            return { ...state, [payload.key]: {
                value: payload.value,
                message: payload.message
            } }
        default:
            return {...state}
    }

}
