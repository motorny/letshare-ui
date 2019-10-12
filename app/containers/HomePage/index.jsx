/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import HomeMain from '../../components/HomeMain';
import HomeSolutions from '../../components/HomeSolutions';
import HomeExpertise from '../../components/HomeExpertise';
import HomeNumbers from '../../components/HomeNumbers';
import HomeCommunity from '../../components/HomeCommunity';
import HomePartners from '../../components/HomePartners';
import ContactUs from '../../components/ContactUs';
import LoadingIndicator from '../../components/LoadingIndicator';
import TechProblem from '../../components/TechProblem';

import { getLocale } from '../../cookieManager';
import { loadContent } from './actions';
import { getDataFromResp } from '../../utils/utils';
import {
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import pages from '../../mockups/pages.json';

const HeaderDiv = styled.div`
    height: 94px;
    @media screen and (max-width: 700px) {
        height: 66px;
    }
`;

export class HomePage extends React.Component {
  componentDidMount() {
    if(!this.props.data && !this.props.error) {
      this.props.init();
    }
  }
  render() {
    const { loading, error, data } = this.props;
    const locale = getLocale();
    if(error) {
      console.log(error);
      return (
        <TechProblem/>
      )
    }
    if(data) {
      const contacts = getDataFromResp(data.contacts);
      const links = getDataFromResp(data.links);
      const images = getDataFromResp(data.homeimages);
      return (
        <div>
          <Helmet>
            <title>{pages.home_page[locale]}</title>
            <meta name="description" content="ITS mainpage"/>
          </Helmet>
          <HeaderDiv/>
          <HomeMain
            content={getDataFromResp(data.homemains)}
            mainwords={data.mainwords}
            img_url={images.main.img.url}/>
          <HomeSolutions
            content={getDataFromResp(data.homesolutions)}
            solutions={data.solutions}/>
          <HomeExpertise
            content={getDataFromResp(data.homeexpertises)}
            services={data.services}
            img_url={images.expertise.img.url}/>
          <HomeNumbers
            content={getDataFromResp(data.homenumbers)}
            statistics={data.statistics}/>
          <HomeCommunity
            content={getDataFromResp(data.homecommunities)}
            benefits={data.benefits}
            email={contacts.email}
            join_link={links.join.link}
            img_url={images.community.img.url}/>
          <HomePartners
            content={getDataFromResp(data.homepartners)}
            partners={data.partners}/>
          <ContactUs
            content={getDataFromResp(data.contactus)}
            contacts={contacts}/>
        </div>
      );
    }
    else {
      return <LoadingIndicator/>
    }
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  init: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(loadContent()),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  data: makeSelectData(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainId', reducer });
const withSaga = injectSaga({ key: 'mainId', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
