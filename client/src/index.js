import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Reducers
import reducers from './reducers';

// Styling
import './index.css';

// Only run devtools in dev
const composeEnhancers = 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  trace: true,
  traceLimit: 25
}) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk)
);

// Redux
const store = createStore(
  reducers,
  enhancer
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();