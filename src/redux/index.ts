import { createStore } from "redux";
import RootReducer from "./reducers";
import mwares from './mwares'

import * as redux from "redux"

export default (initialState?:any) => {
    const store = createStore(RootReducer, initialState, mwares);

    //hot reload for redux
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}