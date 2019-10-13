/*
 * RegisterPage
 *
 * This is the page for sign up
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { RemoveScroll } from 'react-remove-scroll';
import { Container, Row, Col } from "reactstrap";
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { userDataGettingError } from '../App/actions';
import { makeSelectError } from '../App/selectors';

import ProfileForm from '../../components/ProfileForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getLocale } from '../../cookieManager';
import { BASE64_RE } from '../../utils/utils';
import { urls } from '../../utils/constants';
import request from '../../utils/request';


import pages from '../../mockups/pages.json';
import content from '../../mockups/signup.json';

import './index.css'

const fields = ["username", "password", "photo", "name", "location", "contact"];

const Modal = ({locale}) => (
  <RemoveScroll>
    <div
      className="fadeInUp register-page__modal"
      onClick={event => event.preventDefault()}
    />
    <div className="register-page__modal_text_wrap">
      <div className="register-page__modal_text">
        {content.registration[locale]}
      </div>
      <LoadingIndicator style={{margin: '0 auto'}}/>
    </div>
  </RemoveScroll>
);

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSignup = this.onSignup.bind(this);
    this.onFailureSignup = this.onFailureSignup.bind(this);
    this.onSuccessSignup = this.onSuccessSignup.bind(this);

    this.state = { registrating: false, redirect: false };
  }

  componentWillMount() {
    this.props.onError(false);
  }

  onSuccessSignup() {
    this.setState({ registrating: false, redirect: true });
  }

  onFailureSignup(error) {
    this.props.onError(error);
    this.setState({ registrating: false, redirect: false });
  }

  onSignup(event) {
    event.preventDefault();
    let form = document.getElementById("profile-form");
    const data = {};
    fields.forEach(e => data[e] = form[e].value);
    if (data.password !== form.repeated_password.value)
      return;
    data.photo = data.photo.replace(BASE64_RE, '');
    console.log(data);
    this.setState({ registrating: true, redirect: false });
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    request(urls.auth.signup_url, options)
      .then(resp => {
        this.onSuccessSignup();
      })
      .catch(err => {
        if (err.response)
          err.response.json().then(resp => this.onFailureSignup(resp.error));
        else
          this.onFailureSignup(err.message);
      });
  }

  render() {
    const locale = getLocale();
    const { registrating, redirect } = this.state;
    const { error } = this.props;
    if (redirect)
      return <Redirect to="/login" />;
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
                <div className="register-page__col_title animated">
                  <span className="register-page__col_title_text">
                    {content.col_title[locale]}
                  </span>
                </div>
                <ProfileForm required={true} onSubmit={this.onSignup} />
                {error && (
                  <div className="register-page__error">
                    <span className="register-page__col_title_text">
                      {error}
                    </span>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        {registrating && <Modal locale={locale} />}
      </div>
    );
  }
}

RegisterPage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onError: error => dispatch(userDataGettingError(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(RegisterPage);
