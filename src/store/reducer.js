import { combineReducers } from 'redux';
import { httpRequestLoadingReducer } from './httpRequestLoadingMiddleware';

import appStateReducer from './appStateReducer';
import entityDataReducer from './entityDataReducer'

export default function makeReducer() {
  return combineReducers({
      httpRequestStatus: httpRequestLoadingReducer,
      appState:appStateReducer,
      apiData:entityDataReducer,
  });
}
