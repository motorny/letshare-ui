import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ScrollAnimation from 'react-animate-on-scroll';

import {getLocale} from "../../cookieManager";
import ButtonCollapse from '../ButtonCollapse';

import './index.css';

import homeCommunity from '../../mockups/home-community.json';
import constants from '../../mockups/constants.json';

class HomeCommunity extends React.PureComponent {
    render() {
        const locale = getLocale();
        const contentJobs = (
            <div>
                <p>
                <span>{homeCommunity.jobs.text_1.part_1[locale]}</span>
                <a className="home-community__a" href={constants.mail_href}>{constants.mail}</a>
                <span>{homeCommunity.jobs.text_1.part_2[locale]}</span>
                </p>
                <div>{homeCommunity.jobs.text_2[locale]}</div>
            </div>
        );
        const contentWhy = (
            <div>
                <p>{homeCommunity.why.description[locale]}</p>
                <span className="home-community__give">{homeCommunity.why.we_give.title[locale]}</span>
                {homeCommunity.why.we_give.features.map(el => (
                    <div key={el[locale]} className="home-community__list">
                        <i className="fas fa-arrow-right home-community__list_arrow"/>
                        {el[locale]}
                    </div>
                ))}
            </div>
        );
        const contentPart = (
            <div>
                <span>{homeCommunity.part.description_1[locale]}</span>
                <a className="home-community__a" href={constants.link_vk} target="_blank">
                    {homeCommunity.part.link[locale]}
                </a>
                <span>{homeCommunity.part.description_2[locale]}</span>
            </div>
        );
        return (
            <Container className="home-community" >
                <Row className="home-community__row" id="community">
                    <Col xs="12" md="6" className="home-community__img_col">
                        <img className="home-community__img" src={homeCommunity.img} alt="image"/>
                    </Col>
                    <Col xs="12" md="6">
                        <ScrollAnimation animateIn='fadeInRight'
                                         initiallyVisible={false}
                                         animateOnce={true}>
                            <div className="home-community__text">
                                <p className="home-community__title">
                                    {homeCommunity.title[locale]}
                                </p>
                                <div className="home-community__description">
                                    <span className="home-community__text_common">
                                        {homeCommunity.description[locale]}
                                    </span>
                                </div>
                            </div>
                            <div className="home-community__button_wrap">
                                <ButtonCollapse title={homeCommunity.jobs.title[locale]}
                                                content={contentJobs}/>
                                <ButtonCollapse title={homeCommunity.why.title[locale]}
                                                content={contentWhy}/>
                                <ButtonCollapse title={homeCommunity.part.title[locale]}
                                                content={contentPart}/>
                            </div>
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HomeCommunity;