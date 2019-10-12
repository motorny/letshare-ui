import React from 'react';
import { Container, Row, Col } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from 'prop-types';

import Response from "../Response";
import GooglePolicy from '../GooglePolicy';
import Contact from './contact';
import { getLocale } from "../../cookieManager";
import { post } from '../../utils/utils';
import { CAPTCHA_KEY, emailApi } from '../../utils/constants';

import './index.css';

const recaptchaRef = React.createRef();

class ContactUs extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.showNotificationError = this.showNotificationError.bind(this);
        this.onChangeCaptcha = this.onChangeCaptcha.bind(this);
        this.captchaCallback = this.captchaCallback.bind(this);
        this.executeCaptcha = this.executeCaptcha.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        // 0 - ok, 1 - bad response
        this.state = {
            showResponse: false,
            errorCode: 0,
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    closeNotification() {
        if (this._isMounted) {
            this.setState({
                showResponse: false
            });
        }
    }

    showNotification(response) {
        this.setState({
            showResponse: true,
            errorCode: response.status === 200 ? 0 : 1
        });
        setTimeout(this.closeNotification, 3000);
    }

    showNotificationError() {
        console.log("Captcha errored");
    }

    captchaCallback(value) {
        let form = document.getElementById("form");
        const name = form.name.value;
        const mail = form.mail.value;
        const text = form.text.value;
        const params = {
            "fio": name,
            "email": mail,
            "question": text,
            "token": value
        };

        post(emailApi, params, this.showNotification);

        form.name.value = "";
        form.mail.value = "";
        form.text.value = "";
        recaptchaRef.current.reset();
    }

    onChangeCaptcha(value) {
        const func = this.captchaCallback;
        return new Promise(function(resolve, reject) {
            func(value);
            resolve();
        });
    }

    executeCaptcha(event) {
        event.preventDefault();
        recaptchaRef.current.execute();
    }

    render() {
        const locale = getLocale();
        return (
          <div className="contact-us">
              <Container fluid className="contact-us__container">
                  <Row className="contact-us__row">
                      <Col xs="12" md="6" className="contact-us__col">
                          <div className="contact-us__col_title">
                                <span className="contact-us__col_title_text">
                                    {this.props.content.col_title_left[locale]}
                                </span>
                          </div>
                          <Contact
                            title={this.props.content.title_address[locale]}
                            info={this.props.contacts.address[locale]}
                            className="fas fa-map-marker-alt"
                            href={this.props.contacts.address.link}
                            newTab={true}/>
                          <Contact
                            title={this.props.content.title_email[locale]}
                            info={this.props.contacts.email[locale]}
                            className="fas fa-envelope"
                            href={this.props.contacts.email.link}
                            newTab={false}/>
                          <Contact
                            title={this.props.content.title_tel[locale]}
                            info={this.props.contacts.tel[locale]}
                            className="fas fa-phone"
                            href={this.props.contacts.tel.link}
                            newTab={false}/>
                          <Contact
                            title={this.props.content.title_add_info[locale]}
                            info={this.props.content.add_info[locale]}
                            className="fas fa-info-circle"/>
                      </Col>
                      <Col xs="12" md="6" className="contact-us__col" id="contacts">
                          <div className="contact-us__col_title">
                                <span className="contact-us__col_title_text">
                                    {this.props.content.col_title_right[locale]}
                                </span>
                          </div>
                          <form onSubmit={this.executeCaptcha} id="form">
                              <input className="contact-us__input"
                                     name="name"
                                     type="text"
                                     required
                                     placeholder={this.props.content.input_name[locale]}/>
                              <input className="contact-us__input"
                                     name="mail"
                                     type="email"
                                     required
                                     placeholder={this.props.content.input_email[locale]}/>
                              <textarea className="contact-us__textarea"
                                        name="text"
                                        required
                                        placeholder={this.props.content.input_message[locale]}/>
                              <input className="contact-us__button contact-us__button_text"
                                     type="submit"
                                     value={this.props.content.button[locale]}/>
                              <GooglePolicy/>
                              <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey={CAPTCHA_KEY}
                                onErrored={this.showNotificationError}
                                onChange={this.onChangeCaptcha}/>
                          </form>
                      </Col>
                  </Row>
              </Container>
              {this.state.showResponse
                ? <Response toggle={this.closeNotification.bind(this)}
                            errorCode={this.state.errorCode}/>
                : <div/>
              }
          </div>
        );
    }
}
ContactUs.propTypes = {
    content: PropTypes.object,
    contacts: PropTypes.object
};

export default ContactUs;
