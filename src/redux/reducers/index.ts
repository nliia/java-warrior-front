import Loadings, { LoadingsStore } from './Loadings'
import { combineReducers } from 'redux';

export default combineReducers({
    Loadings
})

export interface Reducers {
    Loadings: LoadingsStore
}