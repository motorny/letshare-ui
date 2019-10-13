/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import {Container} from "reactstrap";

import SearchField from "../../components/SearchField";

import { getLocale } from '../../cookieManager';

import './index.css';
import pages from '../../mockups/pages.json';

export class HomePage extends React.Component {

    render() {

        const locale = getLocale();

        return (
            <Container className="home-page">
                <Helmet>
                    <title>{pages.home_page[locale]}</title>
                    <meta name="description" content="ITS mainpage"/>
                </Helmet>
                <SearchField/>
            </Container>
        );
    }
}

export default HomePage;
