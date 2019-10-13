import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Redirect } from 'react-router-dom';

import LoadingIndicator from '../components/LoadingIndicator/index';
import { getLogined, getSession, setUser } from '../cookieManager';
import requestAuth from './requestAuth';
import { userDataGettingError, userDataGot } from '../containers/App/actions';
import { logout } from '../utils/utils';

import { urls } from './constants';

export const AUTH = 'authorizeUserComponent';
export const REQUEST = 'requestComponent';

/**
 * Dynamically injects a authorization
 *
 * @param {string} mode An authorization mode
 *
 */
const Auth = ({ mode }) => WrappedComponent => {
  class AuthorizationInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withAuth(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    state = { req: false, func: false, error: false };
    componentWillMount() {
      if (getLogined() === 'true' && getSession()) {
        const requestURL = urls.auth.token_info_url(getSession());
        this.state.req = true;
        this.state.func = requestAuth(requestURL)
          .then(user => {
            setUser(user.username, user.points, user.photo_url);
            this.context.store.dispatch(userDataGot(user));
            this.setState({ req: false });
          })
          .catch(err => {
            if (err.message !== 'Failed to fetch') logout();
            this.context.store.dispatch(
              userDataGettingError(err.message),
            );
            this.setState({ req: false, error: true });
          });
      }
    }

    render() {
      if (
        mode !== REQUEST &&
        (getLogined() !== 'true' ||
          !getSession() ||
          (!this.state.req &&
            this.state.error))
      )
        return <Redirect to="/login" />;
      if (
        (!this.state.req &&
          (mode === AUTH)) ||
        mode === REQUEST
      )
        return <WrappedComponent {...this.props} />;
      return <LoadingIndicator />;
    }
  }

  return hoistNonReactStatics(AuthorizationInjector, WrappedComponent);
};

export const withAuth = Auth({ mode: AUTH });
export const withRequest = Auth({ mode: REQUEST });
export default Auth;
