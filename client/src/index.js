import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'
import {fetchData, fetchCategory} from './actions'

const store = createStore(rootReducer,
    applyMiddleware(thunk))

store.dispatch(fetchData()).then((res) => store.getState())
store.dispatch(fetchCategory()).then((res) => store.getState())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
