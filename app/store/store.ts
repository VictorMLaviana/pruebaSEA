import {createStore, applyMiddleware} from 'redux';
import {UsersReducer} from './reducers';
import thunkMiddleware from 'redux-thunk';

export const store = createStore(UsersReducer, applyMiddleware(thunkMiddleware));