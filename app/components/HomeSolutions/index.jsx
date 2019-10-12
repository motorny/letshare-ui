import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Swiper from 'react-id-swiper';

import {getLocale} from "../../cookieManager";

import '../../../node_modules/react-id-swiper/src/styles/css/swiper.css';
import './index.css';

import homeSolutions from '../../mockups/home-solutions.json';

const HomeSolutions = () => {
    const params = {
        slidesPerView: 'auto',
        spaceBetween: 15,
        slidesPerGroup: 1,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        loop: true,
        loopFillGroupWithBlank: true,
    };
    const locale = getLocale();
    return (
        <Container id="solutions">
            <Row className="home-solutions">
                <Col xs="12" md="4">
                    <div className="home-solutions__title">
                        <span className="home-solutions__title_text">
                            {homeSolutions.title[locale]}
                        </span>
                    </div>
                    <div className="home-solutions__divider"/>
                    <div className="home-solutions__description">
                        <span className="home-solutions__description_text">
                            {homeSolutions.description[locale]}
                        </span>
                    </div>
                    <div className="home-solutions__divider"/>
                    <div className="home-solutions__description1">
                        <span className="home-solutions__description_text">
                            {homeSolutions.description1[locale]}
                        </span>
                    </div>
                </Col>
                <Col xs="12" md="8">
                    <Swiper {...params}>
                        {homeSolutions.slides.map(el => {
                            return(
                                <div className="home-solutions__slide" key={el.img}>
                                    <img src={el.img} className="home-solutions__slide_img" alt="feature"/>
                                </div>
                            )
                        })}
                    </Swiper>
                </Col>
            </Row>
        </Container>
    );
};

export default HomeSolutions;