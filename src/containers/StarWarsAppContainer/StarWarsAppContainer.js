/**
 * @author Prakash S
 * @copyright 2017 ServiceMax from GE Digital.
 *Created by prakash on 3/7/18.
 * Setup redux connect here.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StarWarsApp from '../../components/StarWarsApp';
import {getEntityApiData, initAppActionCreator} from '../../store/actionCreators';
import {EntityTypes} from "../../utils/AppConstants";

class StarWarsAppContainer extends Component {
  componentDidMount() {
     const { actions:{initApp,getEntityApiData} } = this.props;
      initApp();
      getEntityApiData(EntityTypes.FILMS,'episode_id');
      setTimeout(()=>{
          getEntityApiData(EntityTypes.PEOPLE);
          getEntityApiData(EntityTypes.PLANETS);
          getEntityApiData(EntityTypes.SPECIES);
          getEntityApiData(EntityTypes.STARSHIPS);
          getEntityApiData(EntityTypes.VEHICLES);
      },0)

  }

  render() {

    return (
         <StarWarsApp {...this.props} />
    );
  }
}




const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        initApp:initAppActionCreator,
        getEntityApiData
    }, dispatch),
});


export default connect(null, mapDispatchToProps)(StarWarsAppContainer);
