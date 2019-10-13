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
import { loadContent, mainLoadingError } from './actions';
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
import { withAuth } from '../../utils/auth';
import requestAuth from '../../utils/requestAuth';
import { urls } from '../../utils/constants';

const HeaderDiv = styled.div`
    height: 120px;
`;

export class RequestsPage extends React.Component {
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.props.init();
    }

    onClick(id, response) {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({status: response}),
      };
      requestAuth(urls.req.put(id), options)
        .then(resp => {this.props.init();})
        .catch(err => {this.props.onError(err);})
    }

    render() {
        const {loading, error, data} = this.props;
        const locale = getLocale();

        let content;
        if (error) {
            content = <TechProblem/>
        }
        else if (data) {
            content =
                <div>
                    <HeaderDiv/>
                    <RequestsList requests_info={data} onClick={this.onClick}/>
                </div>
        }
        else {
            content = <LoadingIndicator/>
        }

        return (
            <div>
                <Helmet>
                    <title>{pages.items_page[locale]}</title>
                    <meta name="description" content="ProductPage"/>
                </Helmet>
                {content}
            </div>
        );
    }
}

RequestsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  init: PropTypes.func,
  onError: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(loadContent()),
    onError: err => dispatch(mainLoadingError(err)),
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

const withReducer = injectReducer({ key: 'requestsId', reducer });
const withSaga = injectSaga({ key: 'requestsId', saga });

export default compose(
  withAuth,
  withReducer,
  withSaga,
  withConnect,
)(RequestsPage);
