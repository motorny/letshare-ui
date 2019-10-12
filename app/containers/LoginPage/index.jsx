/*
 * LoginPage
 *
 * This is the page fot log in
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { RemoveScroll } from 'react-remove-scroll';
import { Container, Row, Col } from "reactstrap";
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { userDataGettingError, userDataGot } from '../App/actions';
import { makeSelectError } from '../App/selectors';

import LoadingIndicator from '../../components/LoadingIndicator';
import { getLocale } from '../../cookieManager';
import authorize from '../../utils/oauth2-authorize';

import pages from '../../mockups/pages.json';
import content from '../../mockups/login.json';

import './index.css'

const Modal = ({locale}) => (
  <RemoveScroll>
    <div
      className="fadeInUp login-page__modal"
      onClick={event => event.preventDefault()}
    />
    <div className="login-page__modal_text_wrap">
      <div className="login-page__modal_text">
        {content.authorization[locale]}
      </div>
      <LoadingIndicator style={{margin: '0 auto'}}/>
    </div>
  </RemoveScroll>
);

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onFailureLogin = this.onFailureLogin.bind(this);
    this.onSuccessLogin = this.onSuccessLogin.bind(this);

    this.state = { logining: false, redirect: false };
  }

  onSuccessLogin(user) {
    this.props.onAuth(user);
    this.setState({ logining: false, redirect: true });
  }

  onFailureLogin(error) {
    this.props.onError(error);
    this.setState({ logining: false, redirect: false });
  }

  onLogin(event) {
    event.preventDefault();
    let form = document.getElementById("login-form");
    const login = form.login.value;
    const password = form.password.value;
    this.setState({ logining: true, redirect: false });
    authorize(login, password, this.onSuccessLogin, this.onFailureLogin);
  }

  render() {
    const locale = getLocale();
    const { logining, redirect } = this.state;
    const { error } = this.props;
    if (redirect)
      return <Redirect to="/" />;
    return (
      <div>
        <Helmet>
          <title>{pages.login_page[locale]}</title>
          <meta name="description" content="LetShare login page"/>
        </Helmet>
        <div className="login-page__img" />
        <div className="login-page__text_wrap">
          <Container className="login-page__container">
            <Row className="login-page__row">
              <Col xs="12" md="12" className="login-page__col">
                <div className="login-page__col_title animated fadeInDownBig">
                  <span className="login-page__col_title_text">
                    {content.col_title[locale]}
                  </span>
                </div>
                <form onSubmit={this.onLogin} id="login-form" className="animated fadeInUpBig">
                  <input className="login-page__input"
                         name="login"
                         type="text"
                         required
                         placeholder={content.input_login[locale]}/>
                  <input className="login-page__input"
                         name="password"
                         type="password"
                         required
                         placeholder={content.input_password[locale]}/>
                  <input className="login-page__button login-page__button_text"
                         type="submit"
                         value={content.button_login[locale]}/>
                </form>
                {error && (
                  <div className="login-page__col_title">
                    <span className="login-page__col_title_text">
                      {error}
                    </span>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        {logining && <Modal locale={locale} />}
      </div>
    );
  }
}

LoginPage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onAuth: PropTypes.func,
  onError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAuth: data => dispatch(userDataGot(data)),
    onError: error => dispatch(userDataGettingError(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(LoginPage);
