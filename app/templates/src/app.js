import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

function reducer(state = 0, action) {
  switch (action.type) {
    case 'inc':
      return state + 1;

    case 'dec':
      return state - 1;

    default:
      return state;
  }
}

const mapState = (state) => ({
  count: state
});

const mapDispatch = (dispatch) => ({
  inc: () => dispatch({type: 'inc'}),
  dec: () => dispatch({type: 'dec'})
});

@connect(mapState, mapDispatch)
class Counter extends Component {

  render() {
    const { count, inc, dec } = this.props;

    return (
      <div>
        <div>Count: {count}</div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
      </div>
    );
  }
}

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);


ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>
  ,
  document.getElementById('app')
);
