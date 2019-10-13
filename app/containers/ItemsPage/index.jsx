import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import LoadingIndicator from '../../components/LoadingIndicator';
import TechProblem from '../../components/TechProblem';
import ItemsList from "../../components/ItemsList";

import { getLocale } from '../../cookieManager';
import { loadContent } from './actions';
import {
  makeSelectData,
  makeSelectError,
  makeSelectLoading, makeSelectSearch,
} from './selectors';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import pages from '../../mockups/pages.json';
import { withRequest } from '../../utils/auth';
import { withRouter } from 'react-router-dom';
import { parseQueryString } from '../../utils/utils';

const HeaderDiv = styled.div`
    height: 120px;

`;

export class ItemsPage extends React.Component {
    componentDidMount() {
      let search = this.props.location.search.substring(1);
      search = parseQueryString(search).search;
      this.props.init(search);
    }

    componentDidUpdate() {
      let search = this.props.location.search.substring(1);
      search = parseQueryString(search).search;
      if (this.props.search !== search) {
        this.props.init(search);
      }
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
                    <ItemsList update={this.props.init} items_info={data} flag_search={true}/>
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

ItemsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  init: PropTypes.func,
  search: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: search => dispatch(loadContent(search)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  data: makeSelectData(),
  search: makeSelectSearch(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'itemsId', reducer });
const withSaga = injectSaga({ key: 'itemsId', saga });

export default compose(
  withRequest,
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(ItemsPage);
