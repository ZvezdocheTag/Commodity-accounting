import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'
import {fetchData, addGood} from './actions'

const store = createStore(rootReducer,
    applyMiddleware(thunk))


store.dispatch(fetchData()).then(() => store.getState())
// store.dispatch(addGood({"DUFUU": 21}))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
