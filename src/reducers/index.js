import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import profileReducer from './profileReducer';
import authorizationReducer from './authorizationReducer';
import {connectRouter} from 'connected-react-router';

export default (history) => combineReducers({
    chatReducer,
    profileReducer,
    authorizationReducer,
    router: connectRouter(history)
});