import React, {Component} from 'react';
import './App.scss';
import Router from './common/Router';
import {Provider} from 'react-redux';
import initStore, {history} from './utils/store';
import {ConnectedRouter} from 'connected-react-router';
import {PersistGate} from 'redux-persist/integration/react';

const {store, persistor} = initStore();

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ConnectedRouter history={history}>
                        <Router/>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        )
    }
}
