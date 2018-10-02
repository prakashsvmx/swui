import * as Constants from "./Constants";
import { getEntityApiDataSuccess } from './actionCreators';

export const getEntityTypeApiDataList = (entityType, indexKey,pageNumber, entityId,callback = ()=> true) => {
    let  url = `${Constants.SWAPI_BASE_URL}/${entityType}`;

    let loadingFlag = `${entityType}Loading`;
    if(pageNumber){
        url=`${url}/?page=${pageNumber}`
    }
    if(entityId)
    {
        url=`${url}/${entityId}`;
         loadingFlag = `${entityType}DetailsLoading`;
    }
    const getFilmsAction = {
        callAPI: () => fetch(new Request(url)),
        httpLoadTrackingKey:loadingFlag ,
        isHttpAction: true,
        responseHandler: (dispatch, promise) => {
            promise.then(apiResponseData => {
                dispatch(getEntityApiDataSuccess(apiResponseData, entityType, indexKey,pageNumber));
                callback(apiResponseData, promise);
            }).catch((error) => {
                callback({ error: true,
                    ...error,
                }, promise);
            })
            ;
        },
    };
    return getFilmsAction;
};
