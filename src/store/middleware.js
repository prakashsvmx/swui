import { compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger as reduxLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import httpRequestLoadingMiddleware from './httpRequestLoadingMiddleware';
const env = process.env;
let composeEnhancers = compose;
const enableDevTools = true;

/* istanbul ignore if */
if (typeof __DEV__ !== 'undefined' && /* istanbul ignore next */typeof __TEST__ === 'undefined') {
  /* eslint-disable no-underscore-dangle */
  if (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
}

export default function makeEnhancers() {
  let reduxExtension = f => f;
  /* istanbul ignore if  */
  if (enableDevTools
    && /* istanbul ignore next */window.__REDUX_DEVTOOLS_EXTENSION__) {
    reduxExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
  }
  return composeEnhancers(
    applyMiddleware(
      reduxLogger,
      httpRequestLoadingMiddleware, thunkMiddleware, promiseMiddleware),
    reduxExtension,
  );
}
