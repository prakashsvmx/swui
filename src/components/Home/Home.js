import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardImgOverlay, Button } from 'reactstrap';
import classNames from 'classnames';
import { bindActionCreators } from  'redux';
import { connect,  } from 'react-redux';

const _ = require('lodash');

const Home = ({exploreItems}) => (

    <Container>
        <Row>

      {
          exploreItems.map((exploreItem)=>
              <Col key={exploreItem.type} className={classNames('ExploreItems',exploreItem.type)} sm="4" >
                  <Card inverse>
                      <CardBody>
                      <CardTitle className={exploreItem.type}>{exploreItem.title}</CardTitle>
                          <CardImg width="100%" src={exploreItem.coverImage.url} />
                          <CardText>{exploreItem.description}</CardText>

                      </CardBody>


                      <CardImgOverlay>
                          <CardTitle className={exploreItem.type}>{exploreItem.title}</CardTitle>
                          <CardText>
                                  <Link  key={exploreItem.type} to={`/${exploreItem.type}`}>Explore</Link>
                          </CardText>
                      </CardImgOverlay>
                  </Card>
              </Col>

          )}

        </Row>
    </Container>
);

const mapStateToProps = (state, ownProps = {}) => {
   return {
        exploreItems: _.sortBy(state.appState.exploreItems,'type')
    }
};
export default connect(mapStateToProps)(Home);
