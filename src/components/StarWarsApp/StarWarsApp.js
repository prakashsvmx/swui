import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';

import StarWarsAppLayout from '../StarWarsAppLayout';
import NotFound from '../../components/NotFound';
import Home from '../Home';
import Films from '../Films';
import EpisodeDetails from '../EpisodeDetails/EpisodeDetails';

const StarWarsApp = (appProps) => (
  <HashRouter>
    <StarWarsAppLayout>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} />
          }
        />
        <Route
          exact
          path="/films"
          render={(props) => <Films {...props} />
          }
        />
        <Route
          exact
          path="/films/:id"
          render={(props) => <EpisodeDetails {...props} />
          }
        />
        <Route component={NotFound}/>
      </Switch>
    </StarWarsAppLayout>
  </HashRouter>
);
export default StarWarsApp;
