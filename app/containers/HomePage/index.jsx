/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import HomeMain from '../../components/HomeMain';
import HomeSolutions from '../../components/HomeSolutions';
import HomeExpertise from '../../components/HomeExpertise';
import HomeNumbers from '../../components/HomeNumbers';
import HomeCommunity from '../../components/HomeCommunity';
import HomePartners from '../../components/HomePartners';
import ContactUs from '../../components/ContactUs';

const HeaderDiv = styled.div`
    height: 94px;
    @media screen and (max-width: 700px) {
        height: 66px;
    }
`;

const HomePage = () => (
  <div>
    <Helmet>
      <title>ITS</title>
      <meta name="description" content="A SITE application homepage" />
    </Helmet>
    <HeaderDiv/>
    <HomeMain/>
    <HomeSolutions/>
    <HomeExpertise/>
    <HomeNumbers/>
    <HomeCommunity/>
    <HomePartners/>
    <ContactUs/>
  </div>
);

export default HomePage;
