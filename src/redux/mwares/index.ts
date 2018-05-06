import * as redux from 'redux'

import AsyncDispatch from './AsyncDispatch'

export default redux.applyMiddleware(AsyncDispatch)