/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import {Container} from "reactstrap";

import HomeSearch from "../../components/HomeSearch";

import { getLocale } from '../../cookieManager';

import './index.css';
import pages from '../../mockups/pages.json';

export class HomePage extends React.Component {

    render() {

        const locale = getLocale();

        return (
            <div className="home-page">

            <Container className="home-page__container">
                <Helmet>
                    <title>{pages.home_page[locale]}</title>
                    <meta name="description" content="ITS mainpage"/>
                </Helmet>
                <HomeSearch/>
            </Container>
            </div>
        );
    }
}

export default HomePage;
