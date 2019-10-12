/*
 * RegisterPage
 *
 * This is the page fot sign up
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
import content from '../../mockups/signup.json';

import './index.css'

const Modal = ({locale}) => (
  <RemoveScroll>
    <div
      className="fadeInUp register-page__modal"
      onClick={event => event.preventDefault()}
    />
    <div className="register-page__modal_text_wrap">
      <div className="register-page__modal_text">
        {content.authorization[locale]}
      </div>
      <LoadingIndicator style={{margin: '0 auto'}}/>
    </div>
  </RemoveScroll>
);

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSignup = this.onSignup.bind(this);
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

  onSignup(event) {
    event.preventDefault();
    let form = document.getElementById("signup-form");
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
          <title>{pages.register_page[locale]}</title>
          <meta name="description" content="LetShare sign up page"/>
        </Helmet>
        <div className="register-page__img" />
        <div className="register-page__text_wrap">
          <Container className="register-page__container">
            <Row className="register-page__row">
              <Col xs="12" md="12" className="register-page__col">
                <div className="register-page__col_title animated fadeInDownBig">
                  <span className="register-page__col_title_text">
                    {content.col_title[locale]}
                  </span>
                </div>
                <form onSubmit={this.onSignup} id="signup-form" className="animated fadeInUpBig">
                  <input className="register-page__input"
                         name="login"
                         type="text"
                         required
                         placeholder={content.input_login[locale]}/>
                  <input className="register-page__input"
                         name="password"
                         type="password"
                         required
                         placeholder={content.input_password[locale]}/>
                  <input className="register-page__button login-page__button_text"
                         type="submit"
                         value={content.button_login[locale]}/>
                </form>
                {error && (
                  <div className="register-page__col_title">
                    <span className="register-page__col_title_text">
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

RegisterPage.propTypes = {
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

export default withConnect(RegisterPage);
