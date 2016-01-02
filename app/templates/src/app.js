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
import reduxLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

/**
 * reducers / actions
 */
import { message } from './reducers';
import { setMessage } from './actions';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  reduxLogger
)(createStore);

const store = createStoreWithMiddleware(message);

store.dispatch(setMessage('Hello, World!'));

const Message = ({message}) => (
  <div>
    <p><strong>Message:</strong>≤</p>
    <p>{message}</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Message />
      </Provider>
    );
  }
}

App = connect(state => state)(App);

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
);
