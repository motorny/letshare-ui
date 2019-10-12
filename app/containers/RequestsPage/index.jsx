import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import LoadingIndicator from '../../components/LoadingIndicator';
import TechProblem from '../../components/TechProblem';
import RequestsList from "../../components/RequestsList";

import { getLocale } from '../../cookieManager';
import { loadContent } from './actions';
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
import requests_info from '../../mockups/requests.json'

const HeaderDiv = styled.div`
    height: 120px;
    @media screen and (max-width: 700px) {
        height: 66px;
    }
`;

export class RequestsPage extends React.Component {
    componentDidMount() {
        if (!this.props.data && !this.props.error) {
            this.props.init();
        }
    }

    render() {
        const {loading, error, data} = this.props;
        const locale = getLocale();
        if (error) {
            console.log(error);
            return (
                <TechProblem/>
            )
        }
        if (data) {
            return (
                <div>
                    <Helmet>
                        <title>{pages.requests_page[locale]}</title>
                        <meta name="description" content="ProductPage"/>
                    </Helmet>
                    <HeaderDiv/>
                    <RequestsList requests_info={requests_info}/>
                </div>
            );
        } else {
            return <LoadingIndicator/>
        }
    }
}

RequestsPage.propTypes = {
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
)(RequestsPage);
