import React from 'react';
import { connect } from 'react-redux';
import { MoonLoader } from 'react-spinners';
import 'react-star-wars-crawl/lib/index.css';
import { Media } from 'reactstrap';
import { toRomanNumeral } from '../../utils/Helpers';

class EpisodeDetails extends React.Component {

  render () {
    const {
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
        <Media className="mt-1">
          <Media left middle href="#">
            <Media object onerror="this.src='../assets/images/noimage.jpg'" src={`https://starwars-visualguide.com/assets/img/films/${episode_id}.jpg`} alt="Generic placeholder image"/>
          </Media>
          <Media body className="FilmDetails">
            <Media heading className="films">
              {toRomanNumeral(episode_id)}. {title}
            </Media>
            <br/>
            {opening_crawl}
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
      );
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  const {match: {params: {id}}} = ownProps;
  const filmDetails = state.apiData.films.list && state.apiData.films.list[id];
  return {
    filmDetails,
    isDetailsLoading: (state.httpRequestStatus.filmsDetailsLoading || state.httpRequestStatus.filmsLoading),
  };
};

export default connect(mapStateToProps)(EpisodeDetails);
