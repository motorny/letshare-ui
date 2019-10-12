import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';

import { getLocale } from '../../cookieManager';
import { serverUrl } from '../../utils/constants';

import '../../../node_modules/react-id-swiper/src/styles/css/swiper.css';
import './index.css';

const HomeSolutions = (props) => {
  const params = {
    slidesPerView: 'auto',
    spaceBetween: 15,
    slidesPerGroup: 1,
    autoplay: {
      delay: 40000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    loopFillGroupWithBlank: true,
  };
  const locale = getLocale();
  return (
    <Container id="solutions">
      <Row className="home-solutions">
        <Col xs="12" lg="4">
          <div className="home-solutions__title">
            <span className="home-solutions__title_text">
              {props.content.title[locale]}
            </span>
          </div>
          <div className="home-solutions__divider"/>
          <div className="home-solutions__description">
            <span className="home-solutions__description_text">
              {props.content.description[locale]}
            </span>
          </div>
          <div className="home-solutions__divider"/>
          <div className="home-solutions__description1">
            <span className="home-solutions__description_text">
              {props.content.description_bottom[locale]}
            </span>
          </div>
        </Col>
        <Col xs="12" lg="8">
          <Swiper {...params}>
            {props.solutions.map((el, index) => (
              <div className="home-solutions__slide" key={index}>
                <img
                  src={serverUrl + el.img_v2_h3.url}
                  className="home-solutions__slide_img"
                  alt="feature"
                />
                <div className="home-solutions__slide_title">
                  {el['title_' + locale]}
                </div>
                <div className="home-solutions__slide_description">
                  {el['description_' + locale]}
                </div>
              </div>
            ))}
          </Swiper>
        </Col>
      </Row>
    </Container>
  );
};
HomeSolutions.propTypes = {
  content: PropTypes.object,
  solutions: PropTypes.array
};

export default HomeSolutions;
