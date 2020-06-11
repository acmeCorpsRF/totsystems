import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import profileReducer from './profileReducer';
import {connectRouter} from 'connected-react-router';

export default (history) => combineReducers({
    chatReducer,
    profileReducer,
    router: connectRouter(history)
});