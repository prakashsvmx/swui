import React from 'react';
import StarWarsAppHeader from '../StarWarsAppHeader';
import { withRouter } from 'react-router';
import './StarWarsAppLayout.scss';


export const StarWarsAppLayout = (props) => (
  <div className="DesignerAppLayout">
    {<StarWarsAppHeader
      displayTags={props.displayTags}
      title="My Current Tilte"
    />}
    <React.Fragment>
      {props.children}
    </React.Fragment>
  </div>
);
export default withRouter(StarWarsAppLayout);
