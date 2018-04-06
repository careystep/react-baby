import React from 'react';
import ReactDOM from 'react-dom';
import './base.css';
import RouterMap from './router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <RouterMap />
    </Provider>
    ,
    document.getElementById('root')
);

registerServiceWorker();
