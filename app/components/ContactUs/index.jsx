import React from 'react';
import { Container, Row, Col } from "reactstrap";
import 'whatwg-fetch'

import { getLocale } from "../../cookieManager";
import Response from "../Response";

import './index.css';

import contactUs from '../../mockups/contact-us.json';
import constants from '../../mockups/constants.json';

const Contact = ({title, info, className, href }) => (
    <div className="contact-us__contact_wrap">
        <div className="contact-us__icon">
            <i className={className + ' contact-us__i'}/>
        </div>
        <div className="contact-us__contact_text">
            <div className="contact-us__contact_title">
                {title}
            </div>
            {href === undefined
                ? <div className="contact-us__contact_info">{info}</div>
                : <a href={href} className="contact-us__contact_info contact-us__contact_link">{info}</a>
            }
        </div>
    </div>
);

class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.state = {
            showResponse: false,
            responseOk: true,
        }
    }

    closeNotification() {
        this.setState({
            showResponse: false
        });
    }

    showNotification(response) {
        this.setState({
            showResponse: true,
            responseOk: response.status === 200
        });
        setTimeout(this.closeNotification, 3000);
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const mail = event.target.mail.value;
        const text = event.target.text.value;

        window.fetch('http://80.78.255.236:8080/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fio": name,
                "email": mail,
                "question": text
            } )
        }).then(this.showNotification);
        event.target.name.value = "";
        event.target.mail.value = "";
        event.target.text.value = "";
    }

    render() {
        const locale = getLocale();
        return (
            <div className="contact-us" id="contacts">
                <Container fluid className="contact-us__container">
                    <Row className="contact-us__row">
                        <Col xs="12" md="6" className="contact-us__col contact-us__col_left">
                            <div className="contact-us__col_title">
                            <span className="contact-us__col_title_text">
                                <span className="contact-us__col_title_text_bold">
                                    {contactUs.col_title_left.strong[locale]}
                                </span>
                                {contactUs.col_title_left.common[locale]}
                            </span>
                            </div>
                            <Contact
                                title={contactUs.contacts_address.title[locale]}
                                info={constants.address[locale]}
                                className="fas fa-map-marker-alt"/>
                            <Contact
                                title={contactUs.contacts_mail.title[locale]}
                                info={constants.mail}
                                className="far fa-envelope"
                                href={constants.mail_href}/>
                            <Contact
                                title={contactUs.contacts_tel.title[locale]}
                                info={constants.tel}
                                className="fas fa-phone"
                                href={constants.tel_href}/>
                            <Contact
                                title={contactUs.contacts_add_info.title[locale]}
                                info={contactUs.contacts_add_info.info[locale]}
                                className="fas fa-info-circle"/>
                        </Col>
                        <Col xs="12" md="6" className="contact-us__col">
                            <div className="contact-us__col_title">
                            <span className="contact-us__col_title_text contact-us__col_title_text_bold">
                                {contactUs.col_title_right[locale]}
                            </span>
                            </div>
                            <div className="contact-us__col_title">
                            <span className="contact-us__col_title_text">
                                {contactUs.input_title[locale]}
                            </span>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <input className="contact-us__input"
                                       name="name"
                                       type="text"
                                       required
                                       placeholder={contactUs.label_name[locale]}/>
                                <input className="contact-us__input"
                                       name="mail"
                                       type="email"
                                       required
                                       placeholder={contactUs.label_email[locale]}/>
                                <textarea className="contact-us__textarea"
                                          name="text"
                                          required
                                          placeholder={contactUs.label_message[locale]}/>
                                <input className="contact-us__button contact-us__button_text"
                                       type="submit"
                                       value={contactUs.button[locale]}/>
                            </form>
                        </Col>
                    </Row>
                </Container>
                {this.state.showResponse
                    ? <Response toggle={this.closeNotification.bind(this)}
                                responseOk={this.state.responseOk}/>
                    : <div/>
                }
            </div>
        );
    }
}

export default ContactUs;