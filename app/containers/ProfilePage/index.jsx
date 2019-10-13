/*
 * ProfilePage
 *
 * This is the page for profile
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { RemoveScroll } from 'react-remove-scroll';
import { Container, Row, Col } from "reactstrap";
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuth } from '../../utils/auth';

import { userDataGettingError, userDataGot } from '../App/actions';
import { makeSelectError, makeSelectUserData } from '../App/selectors';

import ProfileForm from '../../components/ProfileForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getLocale, setUser } from '../../cookieManager';
import { BASE64_RE } from '../../utils/utils';
import { urls } from '../../utils/constants';
import requestAuth from '../../utils/requestAuth';


import pages from '../../mockups/pages.json';
import content from '../../mockups/profile.json';

import './index.css'

const fields = ["name", "location", "contact"];

const Modal = ({locale}) => (
  <RemoveScroll>
    <div
      className="fadeInUp profile-page__modal"
      onClick={event => event.preventDefault()}
    />
    <div className="profile-page__modal_text_wrap">
      <div className="profile-page__modal_text">
        {content.editing[locale]}
      </div>
      <LoadingIndicator style={{margin: '0 auto'}}/>
    </div>
  </RemoveScroll>
);

export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFailureUpdate = this.onFailureUpdate.bind(this);
    this.onSuccessUpdate = this.onSuccessUpdate.bind(this);

    this.state = { editing: false };
  }

  componentWillMount() {
    this.props.onError(false);
  }

  onSuccessUpdate(user) {
    this.props.onUpdate(user);
    this.setState({ editing: false });
  }

  onFailureUpdate(error) {
    this.props.onError(error);
    this.setState({ editing: false });
  }

  onSubmit(event) {
    event.preventDefault();
    const { user } = this.props;
    let form = document.getElementById("profile-form");
    const data = {};
    fields.forEach(e => { if (data[e] !== '') data[e] = form[e].value; });
    if (form.password.value === form.repeated_password.value
      && form.password.value !== '')
      data.password = form.password.value;
    if (BASE64_RE.test(form.photo.value))
      data.photo = form.photo.value.replace(BASE64_RE, '');
    this.setState({ editing: true });
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    requestAuth(urls.profile.update(user.id), options)
      .then(resp => {
        fields.forEach(e => user[e] = resp[e]);
        user.photo_url = resp.photo_url;
        setUser(user.username, user.points, user.photo_url);
        this.onSuccessUpdate(user);
      })
      .catch(err => {
        if (err.response)
          err.response.json().then(resp => this.onFailureUpdate(resp.error));
        else
          this.onFailureUpdate(err.message);
      });
  }

  render() {
    const locale = getLocale();
    const { editing } = this.state;
    const { error, user } = this.props;
    const data = user;
    data.photo = user.photo_url;
    return (
      <div>
        <Helmet>
          <title>{pages.register_page[locale]}</title>
          <meta name="description" content="LetShare sign up page"/>
        </Helmet>
        <div className="profile-page__img" />
        <div className="profile-page__text_wrap">
          <Container className="profile-page__container">
            <Row className="profile-page__row">
              <Col xs="12" md="12" className="profile-page__col">
                <div className="profile-page__col_title animated">
                  <span className="profile-page__col_title_text">
                    {content.col_title[locale]}
                  </span>
                </div>
                <ProfileForm required={false} onSubmit={this.onSubmit} data={data}/>
                {error && (
                  <div className="profile-page__error">
                    <span className="profile-page__col_title_text">
                      {error}
                    </span>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        {editing && <Modal locale={locale} />}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onError: PropTypes.func,
  onUpdate: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  user: makeSelectUserData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onError: error => dispatch(userDataGettingError(error)),
    onUpdate: user => dispatch(userDataGot(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withAuth,
  withConnect,
)(ProfilePage);
