import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardHeader, CardImgOverlay, Button } from 'reactstrap';
import classNames from 'classnames';
import { bindActionCreators } from  'redux';
import { connect,  } from 'react-redux';
import {getEntityApiData} from "../../store/actionCreators";
import { MoonLoader } from 'react-spinners';
import { toRomanNumeral} from "../../utils/Helpers";

const _ = require('lodash');

class EpisodeCover extends React.Component {

    render () {
        const {filmInfo:{
            episode_id,
            title,
            director,
            release_date,
            producer,
            characters,
            planets,
            starships,
            vehicles,
            species,

        } = {}} = this.props;

                return(
                        <Card>
                            <CardBody>
                                <CardHeader> {toRomanNumeral(episode_id)}. {title}</CardHeader>
                                <CardImg width="100%"
                                         src={`https://starwars-visualguide.com/assets/img/films/${episode_id}.jpg`}/>

                                <CardImgOverlay>
                                    <CardTitle> {toRomanNumeral(episode_id)}. {title}</CardTitle>
                                    <CardText>
                                        <small className="text-muted">Directed by: {director}</small>
                                    </CardText>
                                    <CardText>
                                        <small className="text-muted">Produced by: {producer}</small>
                                    </CardText>
                                    <CardText>
                                        <small className="text-muted">Released On: {release_date}</small>
                                    </CardText>

                                            <CardText>
                                                {
                                                    characters.length>0 && (
                                                <small className="text-muted">
                                                    <Link to={`/people`}>{characters.length} characters</Link>
                                                </small>
                                                    )
                                                }

                                                {
                                                    planets.length>0 && (<small className="text-muted">
                                                        | <Link to={`/planets`}>  {planets.length} planets</Link>
                                                        </small> )
                                                }
                                            </CardText>




                                            <CardText>
                                                {starships.length>0 && (
                                                <small className="text-muted">
                                                    <Link to={`/starships`}>{starships.length} starships</Link>
                                                </small>
                                                )
                                                }

                                                {
                                                    vehicles.length >0 && (
                                                        <small className="text-muted">
                                                            | <Link to={`/vehicles`}>{vehicles.length} vehicles</Link>
                                                        </small>
                                                    )
                                                }
                                            </CardText>

                                    {
                                        species.length>0 && (
                                            <CardText>
                                                <small className="text-muted">
                                                    <Link to={`/species`}>{species.length} species</Link>
                                                </small>
                                            </CardText>
                                        )
                                    }
                                    <CardText>
                                        <Link to={`/films/${episode_id}`}> Explore Details  </Link>
                                    </CardText>

                                </CardImgOverlay>
                            </CardBody>
                        </Card>
                );

    }
}


export default EpisodeCover;
