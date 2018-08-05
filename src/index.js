import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './model/reducers/rootReducer'
import getInitialState from './stateInitializer'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
