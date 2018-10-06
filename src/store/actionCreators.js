import { getEntityTypeApiDataList } from './actions';
import * as ActionTypes from './ActionTypes';

export function initAppActionCreator () {
  return {
    type: ActionTypes.INIT_APP,
  };
};
//apiResponseData, entityType, indexKey, pageNumber)
export const getEntityApiDataSuccess = (data, entityType, indexKey, pageNumber) => {
  let entityTypeInUpperCase = entityType.toUpperCase();
  return ({
    data,
    type: `GET_${entityTypeInUpperCase}_SUCCESS`,
    meta: {
      entityType: entityType,
      indexKey: indexKey,
      pageNumber:pageNumber
    },
  });
};

export const getEntityApiData = (entityType, indexKey, pageNumber, callback) => dispatch => {
  dispatch(getEntityTypeApiDataList(entityType, indexKey, pageNumber, callback, dispatch));
};
