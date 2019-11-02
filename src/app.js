import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore, { history } from '../store/configureStore';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

const store = configureStore();

const app = (
    // Provider allows us to provide the store to all of the components.
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppRouter />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
