import logger from 'redux-logger'
import thunk from 'redux-thunk'
import authReducer from './reducer/authReducer'
import MainReducer from './reducer/userReducer'
import { createStore, combineReducers ,applyMiddleware} from 'redux'

export const rootReducer = createStore(
    combineReducers({
        authReducer,
        MainReducer
    })
    ,{},

    applyMiddleware(logger(),thunk)
)
export  let store = rootReducer;