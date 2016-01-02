/**
 * React
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Redux
 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

/**
 * reducers / actions
 */
import { message } from './reducers';
import { setMessage } from './actions';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

const reducer = combineReducers({
  message
});

const store = createStoreWithMiddleware(reducer);

store.dispatch(setMessage('Hello, World!'));

let Message = ({ message }) => (
  <div>
    <p><strong>Message:</strong></p>
    <p>{message}</p>
  </div>
);

let App = ({store}) => (
  <Provider store={store}>
    <Message />
  </Provider>
);

Message = connect(state => state)(Message);

ReactDOM.render(
  <App store={store} />, 
  document.getElementById('app')
);
