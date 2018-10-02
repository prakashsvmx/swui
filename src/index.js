import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import makeStore from './store';
import { StarWarsAppContainer } from './containers/StarWarsAppContainer';
import 'bootstrap/dist/css/bootstrap.css';
import './theme/index.css';

const store = makeStore();
ReactDOM.render(
  <Provider store={store}>
    <StarWarsAppContainer />
  </Provider>,
  document.getElementById('root'),
);
