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
  makeSelectLoading,
} from './selectors';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import pages from '../../mockups/pages.json';

const HeaderDiv = styled.div`
    height: 120px;
`;

export class UserItemsPage extends React.Component {
    componentDidMount() {
        if (!this.props.data && !this.props.error) {
            this.props.init();
        }
    }

    render() {
        const {loading, error, data} = this.props;
        const locale = getLocale();
        let content;
        if (error) {
            console.log(error);
            content = <TechProblem/>
        }
        else if (data) {
            content =
                <div>
                    <HeaderDiv/>
                    <ItemsList update={this.props.init} items_info={data} flag_search={false}/>
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

UserItemsPage.propTypes = {
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

const withReducer = injectReducer({ key: 'user-itemsId', reducer });
const withSaga = injectSaga({ key: 'user-itemsId', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserItemsPage);
