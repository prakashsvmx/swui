import * as ActionTypes from './ActionTypes';
import * as Constants from './Constants';
import { getEntityTypeApiDataList } from './actions'
export function initAppActionCreator() {
    return {
        type: ActionTypes.INIT_APP
    }
};

export const getEntityApiDataSuccess = (data, entityType,indexKey) => {
    let entityTypeInUpperCase = entityType.toUpperCase();
    return ({
        data,
        type: `GET_${entityTypeInUpperCase}_SUCCESS`,
        meta:{
            entityType:entityType,
            indexKey:indexKey
        }
    });
};



export const getEntityApiData = (entityType, indexKey,pageNumber,callback) => dispatch => {
    dispatch(getEntityTypeApiDataList(entityType,indexKey,pageNumber,callback));
};
