import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Parallax } from "react-parallax";
import ScrollAnimation from 'react-animate-on-scroll';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import PropTypes from 'prop-types';

import Service from './service';
import { getLocale } from "../../cookieManager";
import { serverUrl } from '../../utils/constants';

import './index.css';

const HomeExpertise = (props) => {
  const locale = getLocale();
  const icons = ["fas fa-cloud-download-alt", "fas fa-mobile-alt", "fas fa-project-diagram"];
  return (
    <Parallax bgImage={serverUrl + props.img_url} strength={400}>
      <Container className="home-expertise" >
        <Row noGutters className="home-expertise__top" id="expertise">
          <Col>
            <p className="home-expertise__title">
              {props.content.title[locale]}
            </p>
          </Col>
        </Row>
        <Row className="home-expertise__row_service">
          {props.services.map((el, index) => {
            return (
              <Col xs="12" md="4" className="home-expertise__service_col" key={index}>
                <Service
                  name={el['name_' + locale]}
                  text={el['description_' + locale]}
                  iconClass={icons[index]}
                  index={index}/>
              </Col>
            )
          })}
        </Row>
        <Row>
          <Col className="home-expertise__col_button">
            <ScrollAnimation
                animateIn='fadeInUp'
                initiallyVisible={false}
                animateOnce={true}
                offset={50}>
              <AnchorLink offset={() => 90} href="#contacts">
                <div className="home-expertise__button_wrap home-expertise__button_contact_wrap">
                <span className="home-expertise__button home-expertise__button_contact">
                  {props.content.button_contact[locale]}
                </span>
                </div>
              </AnchorLink>
            </ScrollAnimation>
          </Col>
        </Row>
      </Container>
    </Parallax>
  );
};
HomeExpertise.propTypes = {
  content: PropTypes.object,
  services: PropTypes.array,
  img_url: PropTypes.string
};

export default HomeExpertise;