import IAction from '../interfaces/IAction'
import * as Types from '../types/Loadings'

export interface LoadingsActions {

    set (key: string, value: boolean, message?: string) : IAction

}

export default {

    set (key: string, value: boolean, message: string = "") : IAction {
        return {
            type: Types.SET,
            payload: {
                key, value, message
            }
        }
    }

}
