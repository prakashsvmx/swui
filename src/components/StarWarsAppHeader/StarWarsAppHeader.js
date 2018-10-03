import React from 'react';
import { withRouter } from 'react-router-dom';
import './StarWarsAppHeader.scss';

const StarWarsAppHeader = (props) => {
  return (
    <div className="header jedi-font">
      <div className="title star-wars-title-font">star wars</div>
    </div>
  );
};

export default withRouter(StarWarsAppHeader);
