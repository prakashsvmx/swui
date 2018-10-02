/**
 * @author Prakash S
 * @copyright 2017 ServiceMax from GE Digital.
 *Created by prakash on 3/7/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './StarWarsAppHeader.scss';


const StarWarsAppHeader = (props) => {
  const {
    displayTags,
    history,
    title,
  } = props;

  return (
          <div className="header jedi-font">
              <div className="title star-wars-title-font">star wars</div>
          </div>
  );
};

export default withRouter(StarWarsAppHeader);
