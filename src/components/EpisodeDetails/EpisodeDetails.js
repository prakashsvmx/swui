import React from 'react';
import { connect } from 'react-redux';
import { MoonLoader } from 'react-spinners';
import 'react-star-wars-crawl/lib/index.css';
import { Media , Row, Col } from 'reactstrap';
import { toRomanNumeral } from '../../utils/Helpers';
import {EntityTypes} from "../../utils/AppConstants";
import RelatedList from '../RelatedList';

const _ = require('lodash');

class EpisodeDetails extends React.Component {

  render () {
    const {
        characters,
        planets,
        species,
        vehicles,
        starships,
      filmDetails: {
        episode_id,
        title,
        director,
        release_date,
        producer,
        opening_crawl,
        isDetailsLoading,
      } = {},
    } = this.props;

    if (isDetailsLoading || !episode_id) {
      return (<div className='sweet-loading'>
        <MoonLoader
          sizeUnit={'px'}
          size={150}
          color={'#123abc'}
          loading={true}
        />
      </div>);
    } else {
      return (
          <React.Fragment>
        <Media className="mt-1">
          <Media left middle href="#">
            <Media object src={`https://starwars-visualguide.com/assets/img/films/${episode_id}.jpg`} alt="Generic placeholder image"/>
          </Media>
          <Media body className="FilmDetails">
            <Media heading className="films">
              {toRomanNumeral(episode_id)}. {title}
            </Media>
            <br/>
              <div className="opening_crawl">{opening_crawl}</div>
            <br/>
            <small className="text-muted">Directed by: {director}</small>
            <br/>
            <small className="text-muted">Produced by: {producer}</small>
            <br/>
            <small className="text-muted">Released On: {release_date}</small>
            <br/>



            {/*TODO
            //Implement a logic to identify for all related list items,
            //1. if the item is loaded already in redux state, use the details.
            //  else make the call,
            //  update the redux state.
            //  let it re-render.
            */}



          </Media>
        </Media>
              <Row>
                  <Col xs="12" sm="12">
                    <RelatedList data={characters} type={EntityTypes.PEOPLE} title="Characters"/>
                  </Col>

                  <Col xs="6" sm="6">
                  <RelatedList data={planets} type={EntityTypes.PLANETS} title="Planets"/>
                  </Col>
                  <Col xs="6" sm="6">
                  <RelatedList data={species} type={EntityTypes.SPECIES} title="Species"/>
                  </Col>
                  <Col xs="6" sm="6">
                  <RelatedList data={vehicles} type={EntityTypes.VEHICLES} title="Vehicles"/>
                  </Col>
                  <Col xs="6" sm="6">
                  <RelatedList data={starships} type={EntityTypes.STARSHIPS} title="Starships"/>
                  </Col>
              </Row>
          </React.Fragment>
      );
    }

  }
}

const getEntityDataByType = (data, entityType, sourceArray)=>{

  let resultList = [];
  const entityList = (data[entityType] || {} ).list || {};
    if(Object.keys(entityList)) {
        resultList = _.sortBy(_.map(entityList || {}, (item) => {
            if(_.includes(sourceArray, item.id )){
                if(item) {
                    return {
                        name: item.name,
                        id: item.id,
                        type:entityType,
                    };
                }
            }
        }).filter((item)=> item ? true : false),'name');
    }

    return resultList;
}

const mapStateToProps = (state, ownProps) => {
  const {match: {params: {id}}} = ownProps;
  const filmDetails = state.apiData.films.list && state.apiData.films.list[id];
  let characters = [];
  let planets=[];
  let starships=[];
  let vehicles=[];
  let species=[];

  if(filmDetails)
  {
    const {apiData} = state;
      characters = getEntityDataByType(apiData, EntityTypes.PEOPLE,filmDetails.characters );
      planets = getEntityDataByType(apiData, EntityTypes.PLANETS,filmDetails.planets );
      starships= getEntityDataByType(apiData, EntityTypes.STARSHIPS,filmDetails.starships );
      vehicles = getEntityDataByType(apiData, EntityTypes.VEHICLES,filmDetails.vehicles );
      species= getEntityDataByType(apiData, EntityTypes.SPECIES,filmDetails.species );
  }
  return {
      filmDetails,
      characters,
      planets,
      starships,
      vehicles,
      species,
    isDetailsLoading: (state.httpRequestStatus.filmsDetailsLoading || state.httpRequestStatus.filmsLoading),
  };
};

export default connect(mapStateToProps)(EpisodeDetails);
