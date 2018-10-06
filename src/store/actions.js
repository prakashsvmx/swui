import * as Constants from './Constants';
import { getEntityApiDataSuccess, getEntityApiData } from './actionCreators';
import {indexKeyFormatter} from "../utils/Helpers";

export const getEntityTypeApiDataList = (entityType, indexKey, pageNumber, entityId, callback = () => true,dispatch) => {
  let url = `${Constants.SWAPI_BASE_URL}/${entityType}`;

  let loadingFlag = `${entityType}Loading`;
  if (pageNumber) {
    url = `${url}/?page=${pageNumber}`;
  }
  if (entityId) {
    url = `${url}/${entityId}`;
    loadingFlag = `${entityType}DetailsLoading`;
  }

  const newRequest = new Request(url);
  const getFilmsAction = {
    callAPI: () => fetch(newRequest),
    httpLoadTrackingKey: loadingFlag,
    isHttpAction: true,
    responseHandler: (dispatch, promise) => {
      promise.then(apiResponseData => {
        dispatch(getEntityApiDataSuccess(apiResponseData, entityType, indexKey, pageNumber));
          if(apiResponseData.next ){
              //debugger;
              const pageNumber = indexKeyFormatter(apiResponseData.next);
              console.log('::::',entityType,pageNumber);
              //const action= dispatch{getEntityApiData}, dispatch);

              dispatch(getEntityApiData(entityType, indexKey,pageNumber));
          }
      }).catch((error) => {
        callback({
          error: true,
          ...error,
        }, promise);
      })
      ;
    },
  };
  return getFilmsAction;
};
