import { SWAPI_BASE_URL } from './Constants';

const exploreItems = [
  {
    type: 'characters',
    title: 'Characters',
    coverImage: {url: 'https://starwars-visualguide.com/assets/img/categories/character.jpg'},
    description: 'Your favorite characters',
  },
  {
    type: 'films',
    title: 'Films',
    coverImage: {url: 'https://starwars-visualguide.com/assets/img/categories/films.jpg'},
    description: 'Your favorite Films',
  },
  {
    type: 'species',
    title: 'Species',
    coverImage: {url: 'https://starwars-visualguide.com/assets/img/categories/species.jpg'},
    description: 'Your favorite Species',
  },
  {
    type: 'starships',
    title: 'Starships',
    coverImage: {url: 'https://starwars-visualguide.com/assets/img/categories/starships.jpg'},
    description: 'Your favorite Star Ships',
  },
  {
    type: 'vehicles',
    title: 'Vehicles',
    coverImage: {url: 'https://starwars-visualguide.com/assets/img/categories/vehicles.jpg'},
    description: 'Your favorite Vehicles',
  },
  {
    type: 'planets',
    title: 'Planets',
    coverImage: {url: 'https://starwars-visualguide.com/assets/img/categories/planets.jpg'},
    description: ' Your favorite Planets',
  },
];
const intitialState = {};
export default function appStateReducer (state = intitialState, action = {type: 'INIT_APP'}) {
  if (action.type === 'INIT_APP') {
    return {
      ...state,
      exploreItems,
      apiBaseUrl: SWAPI_BASE_URL,
    };
  }
  return state;
}

