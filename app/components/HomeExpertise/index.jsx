import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Parallax } from "react-parallax";
import ScrollAnimation from 'react-animate-on-scroll';

import {getLocale} from "../../cookieManager";

import './index.css';

import homeExpertise from '../../mockups/home-expertise.json';

/*
<div className="home-expertise__button_wrap">
              <Link className="home-expertise__button" to="#top">
                  {homeExpertise.button[locale]}
              </Link>
          </div>
 */

const Service = ({ name, text, iconClass, locale, index }) => {
    const animationClass = "home-expertise__service_" + index.toString();
    return(
    <ScrollAnimation animateIn='fadeInUp'
                     initiallyVisible={false}
                     animateOnce={true}
                     className={animationClass}>
      <div className="home-expertise__service">
          <i className={iconClass + ' home-expertise__service_icon'}/>
          <div className="home-expertise__service_text_wrap">
            <div className="home-expertise__service_title">
                {name}
            </div>
            <div className="home-expertise__service_text">{text}</div>
          </div>

      </div>
    </ScrollAnimation>
)};

const HomeExpertise = () => {
    const locale = getLocale();
    const icons = ["ti-briefcase", "ti-calendar", "ti-cup", "ti-money"];
    return (
        <Parallax bgImage={homeExpertise.background_img} strength={400}>
            <Container className="home-expertise" id="expertise">
                <Row noGutters className="home-expertise__top">
                    <Col>
                        <p className="home-expertise__title">
                            {homeExpertise.text_title[locale]}
                        </p>
                    </Col>
                </Row>
                <Row className="home-expertise__row_service">
                    {homeExpertise.services.map((el, index) => {
                        return(
                            <Col xs="12" md="4" className="home-expertise__service_col" key={el.name[locale]}>
                                <Service
                                    name={el.name[locale]}
                                    text={el.description[locale]}
                                    iconClass={icons[index]}
                                    locale={locale}
                                    index={index}/>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </Parallax>
    );
};

export default HomeExpertise;