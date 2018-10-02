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
import EpisodeCover from '../EpisodeCover'
import {EntityTypes} from "../../utils/AppConstants";

const _ = require('lodash');

class Films extends React.Component {
    render () {
        const {films=[],isFilmsLoading, } = this.props;
        if(isFilmsLoading) {
            return(<div className='sweet-loading'>
                <MoonLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={true}
                />
            </div>)
        }else {
            return (

                <Container>
                    <Row>

                        {
                            films.map((filmItem) =>
                                <Col key={filmItem.episode_id} className={classNames('FilmItems','films')} sm="3">
                                    <EpisodeCover filmInfo ={filmItem}/>
                                </Col>
                            )}

                    </Row>
                </Container>
            );
        }
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    const filmList = _.sortBy(_.values(state.apiData.films.list),'episode_id');
   return {
       films:filmList,
       isFilmsLoading: state.httpRequestStatus.filmsLoading
    }
};



export default connect(mapStateToProps)(Films);
