import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { Media,Pagination, PaginationItem, PaginationLink,Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardHeader, CardImgOverlay, Button,ListGroup, ListGroupItem } from 'reactstrap';
import classNames from 'classnames';
import { bindActionCreators } from  'redux';
import { connect,  } from 'react-redux';
import {getEntityApiData} from "../../store/actionCreators";
import { MoonLoader } from 'react-spinners';
import { toRomanNumeral} from "../../utils/Helpers";
import Crawl from 'react-star-wars-crawl'
import 'react-star-wars-crawl/lib/index.css'


const _ = require('lodash');

class EpisodeDetails extends React.Component {

    render () {
        const {filmDetails:{
            episode_id,
            title,
            director,
            release_date,
            producer,
            opening_crawl,
            characters,
            planets,
            starships,
            vehicles,
            species,
            isDetailsLoading,

        } = {}} = this.props;


        if(isDetailsLoading || !episode_id){
            return(<div className='sweet-loading'>
                <MoonLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={true}
                />
            </div>)
        }else{
                return(
                    <Media className="mt-1">
                        <Media left middle href="#">
                            <Media object src={`https://starwars-visualguide.com/assets/img/films/${episode_id}.jpg`} alt="Generic placeholder image" />
                        </Media>
                        <Media body className="FilmDetails">
                            <Media heading className="films">
                                {toRomanNumeral(episode_id)}. {title}
                            </Media>
                            <br/>
                            {opening_crawl}
                            <br/>
                            <small className="text-muted">Directed by: {director}</small><br/>
                            <small className="text-muted">Produced by: {producer}</small><br/>
                            <small className="text-muted">Released On: {release_date}</small><br/>
                            <div>

                                <ListGroup>
                                    {
                                        planets.map((item)=><ListGroupItem>{item}</ListGroupItem>)
                                    }
                                </ListGroup>
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem disabled>
                                        <PaginationLink previous href="#" />
                                    </PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink href="#">
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink next href="#" />
                                    </PaginationItem>
                                </Pagination>


                            </div>
                        </Media>
                    </Media>
                );
        }

    }
}


const mapStateToProps = (state, ownProps) => {
    const { match:{params:{id}} } = ownProps;
    const filmDetails = state.apiData.films.list && state.apiData.films.list[id];
    return {
        filmDetails,
        isDetailsLoading: (state.httpRequestStatus.filmsDetailsLoading || state.httpRequestStatus.filmsLoading)
    }
};



export default connect(mapStateToProps)(EpisodeDetails);
