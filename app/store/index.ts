import {createUserReducer} from './reducers'

const rootReducer = combineReducers({
    userNew: createUserReducer
})

export type RootState = ReturnType<typeof rootReducer>