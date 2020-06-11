import {createStore, applyMiddleware, compose} from 'redux';
import initReducers from './../reducers';
import middlewares from '../middlewares';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

const persistConfig = {
    key: 'Messanger',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['chatReducer', 'profileReducer']
};

export const history = createBrowserHistory();

function initStore() {

    const innitialStore = {};
    const store = createStore(
        persistReducer(persistConfig, initReducers(history)),
        innitialStore,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history), ...middlewares),
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    const persistor = persistStore(store);
    return {store, persistor};
}

export default initStore;