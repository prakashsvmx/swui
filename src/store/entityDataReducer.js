import { EntityTypes } from '../utils/AppConstants';
import { indexKeyFormatter } from '../utils/Helpers';

const _ = require('lodash');

const intitialState = {
  films: {},
  people: {},
};

function getFormattedActionData(action) {

    const {data: {results},
    } = action;
    const formattedResults = results.map((result) => {
            const {films = [], characters = [], planets = [], starships = [], vehicles = [], species = []} = result;
            return ({
                ...result,
                films: films.map(indexKeyFormatter),
                characters: characters.map(indexKeyFormatter),
                planets: planets.map(indexKeyFormatter),
                starships: starships.map(indexKeyFormatter),
                vehicles: vehicles.map(indexKeyFormatter),
                species: species.map(indexKeyFormatter),

            });
        },
    );
    return formattedResults;

}
export default function entityDataReducer (state = intitialState, action) {
  const {
    meta: {
      entityType = '',
      indexKey = '',
    } = {},
  } = action;
  // const entityType = action.meta.entityType;
  //const entityIndexKey =  action.meta.indexKey;
  const entityTypeUpper = entityType.toUpperCase();


  let dataItems = {};
  if (entityType && action.type === `GET_${entityTypeUpper}_SUCCESS`) {

      const {data: { count, next, previous},
      } = action;

     // if(next) debugger;
    const formattedData = getFormattedActionData(action);

    if (entityType === EntityTypes.FILMS) {
      dataItems = _.mapKeys(formattedData, indexKey);
    } else {
      const idMapping = formattedData.map((item) => ({
        ...item,
        id: indexKeyFormatter(item.url),
      }));
      dataItems = _.mapKeys(idMapping, 'id');
    }
    const {list=[]} = state[entityType] || {};
    const newState = {
      ...state,
      [entityType]: {
        meta: {
          count,
          next,
          previous,
        },
        list: {...list,...dataItems},
      },
    };

    return newState;
  }
  return state;
}
