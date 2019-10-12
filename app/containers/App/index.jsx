/* eslint-disable react/prop-types,react/no-array-index-key */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import routes from '../../utils/routeConfig';
import CookieBanner from '../CookieBanner/index';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from '../../components/ScrollToTop';

import './index.css';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <CookieBanner/>
                <a id="top"/>
                <div className="app__theme">
                    <ScrollToTop>
                        <Helmet titleTemplate="%s - SITE" defaultTitle="SITE">
                            <meta name="description" content="A SITE application"/>
                        </Helmet>
                        <Header/>
                        <Switch>
                            {routes.map((route, i) => (
                                <Route
                                    key={i}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))}
                        </Switch>
                        <Footer/>
                    </ScrollToTop>
                </div>
            </div>
        );
    }
}
