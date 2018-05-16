import Loadings, { LoadingsStore } from './Loadings'
import Modals, { ModalsStore } from './Modals'
import { combineReducers } from 'redux';

export default combineReducers({
    Loadings,
    Modals
})

export interface Reducers {
    Loadings: LoadingsStore,
    Modals: ModalsStore
}