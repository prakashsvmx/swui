import { deleteObjectProperty} from "../utils";

export const HTTP_REQUEST_LOADING = 'HTTP_REQUEST_LOADING';
export const HTTP_REQUEST_FAILED = 'HTTP_REQUEST_FAILED';
export const HTTP_REQUEST_LOADED = 'HTTP_REQUEST_LOADED';

export const httpRequestLoadingActionType = { type: HTTP_REQUEST_LOADING };
export const httpRequestFailedActionType = { type: HTTP_REQUEST_FAILED };
export const httpRequestLoadedActionType = { type: HTTP_REQUEST_LOADED };

const _ = require('lodash');
const intitialState = {
};

export function httpRequestInProgress(dispatch, httpRequestTrackingKey) {
  dispatch({
    ...httpRequestLoadingActionType,
    httpLoadTrackingKey: httpRequestTrackingKey,
  });
}
export function httpRequestFailure(dispatch, httpRequestTrackingKey) {
  dispatch({
    ...httpRequestFailedActionType,
    httpLoadTrackingKey: httpRequestTrackingKey,
  });
}
export function httpRequestSuccess(dispatch, httpRequestTrackingKey) {
  dispatch({
    ...httpRequestLoadedActionType,
    httpLoadTrackingKey: httpRequestTrackingKey,
  });
}

export function getHttpResponseDataHandler(dispatch, serviceResponse, httpRequestTrackingKey) {
  return new Promise((resolve, reject) => {
    if (_.isEmpty(serviceResponse)) {
      httpRequestFailure(dispatch, httpRequestTrackingKey);
      reject(serviceResponse);
    } else {
      resolve(serviceResponse);
    }
  });
}

export default function httpRequestLoadingMiddleware({ dispatch }) {
  return next => action => {
    const {
      isHttpAction,
      callAPI,
      httpLoadTrackingKey,
      // used to pass remaining props from dispatch action along
    } = action;
    // if we don't have the `isHttpAction` prop
    // we're not supposed to intercept it with this middleware... move it along
    if (!isHttpAction) {
      return next(action);
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    // dispatch the request action (`REQ_ITEM`)
    httpRequestInProgress(dispatch, httpLoadTrackingKey);

    const api = callAPI();

    return api.then((serviceResponse) => {
      // action.success(dispatch, resp, error);

      let responsePromise = null;
        const respObj = serviceResponse.json();
        responsePromise = respObj.then((restResponseData) => {
            const restResponse = getHttpResponseDataHandler(dispatch,
                restResponseData,
                httpLoadTrackingKey);
            return restResponse;
        });
      const returnPromise = action.responseHandler(dispatch, responsePromise);
      if (returnPromise) {
        returnPromise.then(() => {
          httpRequestSuccess(dispatch, httpLoadTrackingKey);
        }).catch(() => {
          httpRequestFailure(dispatch, httpLoadTrackingKey);
        });
      } else {
        httpRequestSuccess(dispatch, httpLoadTrackingKey);
      }
    });
  };
}

export function httpRequestLoadingReducer(state = intitialState, action) {
  if (action.httpLoadTrackingKey) {
    const { httpLoadTrackingKey, type } = action;
    switch (type) {
      case HTTP_REQUEST_LOADING:
        return { ...state, [httpLoadTrackingKey]: true };
      case HTTP_REQUEST_FAILED:
      case HTTP_REQUEST_LOADED: {
        const clonedState = { ...state };
        deleteObjectProperty(clonedState, httpLoadTrackingKey);
        return clonedState;
      }
      default:
        return state;
    }
  }
  return state;
}
