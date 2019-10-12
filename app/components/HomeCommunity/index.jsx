import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import PropTypes from 'prop-types';

import ButtonCollapse from '../ButtonCollapse';
import { getLocale } from "../../cookieManager";
import { serverUrl } from '../../utils/constants';

import './index.css';

const HomeCommunity = (props) => {
  const locale = getLocale();
  const contentJobs = (
    <div>
      <p>
        <span>{props.content.jobs_text1_part1[locale]}</span>
        <a className="home-community__a" href={props.email.link}>{props.email[locale]}</a>
        <span>{props.content.jobs_text1_part2[locale]}</span>
      </p>
      <div>{props.content.jobs_text2[locale]}</div>
    </div>
  );
  const contentWhy = (
    <div>
      <p>{props.content.why_description[locale]}</p>
      <span className="home-community__give">{props.content.why_benefits[locale]}</span>
      {props.benefits.map(el => (
        <div key={el[locale]} className="home-community__list">
          <i className="fas fa-arrow-right home-community__list_arrow"/>
          {el[locale]}
        </div>
      ))}
    </div>
  );
  const contentPart = (
    <div>
      <span>{props.content.join_description_1[locale]}</span>
      <a className="home-community__a" href={props.join_link} target="_blank">
        {props.content.join_link[locale]}
      </a>
      <span>{props.content.join_description_2[locale]}</span>
    </div>
  );
  return (
    <Container className="home-community">
      <Row className="home-community__row" id="community">
        <Col xs="12" md="6" className="home-community__img_col">
          <img className="home-community__img" src={serverUrl + props.img_url} alt="image"/>
        </Col>
        <Col xs="12" md="6">
          <ScrollAnimation
              animateIn='fadeInRight'
              initiallyVisible={false}
              animateOnce={true}>
            <div className="home-community__text">
              <p className="home-community__title">
                {props.content.title[locale]}
              </p>
              <div className="home-community__description">
                <span className="home-community__text_common">
                  {props.content.description[locale]}
                </span>
              </div>
            </div>
            <div className="home-community__button_wrap">
              <ButtonCollapse title={props.content.jobs_title[locale]}
                              content={contentJobs}/>
              <ButtonCollapse title={props.content.why_title[locale]}
                              content={contentWhy}/>
              <ButtonCollapse title={props.content.join_title[locale]}
                              content={contentPart}/>
            </div>
          </ScrollAnimation>
        </Col>
      </Row>
    </Container>
  );
};
HomeCommunity.propTypes = {
  content: PropTypes.object,
  benefits: PropTypes.array,
  email: PropTypes.object,
  join_link: PropTypes.string,
  img_url: PropTypes.string
};

export default HomeCommunity;