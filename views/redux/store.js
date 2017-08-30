import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import loadDataReducer from './LoadDataReducer'


const logger = createLogger({
    timestamp:true,
    duration:true
})
const middleware = compose(
    applyMiddleware(thunk, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)
const allReducers = combineReducers({
    loadDataReducer,
})

export default createStore(allReducers, middleware)


