import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { HashLink as Link } from 'react-router-hash-link';

import Policy from '../../components/Policy';
import { getLocale } from '../../cookieManager';

import './index.css';

import footer from '../../mockups/footer.json';
import pages from '../../mockups/pages.json';
import constants from '../../mockups/constants.json';

const MapCol = ({list, title, locale}) => (
    <Col xs="6" md="" className="footer__col">
        <div className="footer__nav-list">
            <h4 className="footer__col-title">{title}</h4>
            {list.map(el => (
                <div key={el.linkName[locale]}>
                    {window.location.pathname === '/'
                        ?
                        <AnchorLink
                            offset={() => 90}
                            className="footer__a footer__text footer__text_color"
                            href={el.link}>
                            {el.linkName[locale]}
                        </AnchorLink>
                        :
                        <Link
                            className="footer__a footer__text footer__text_color"
                            to={`/${el.link}`}>
                            {el.linkName[locale]}
                        </Link>
                    }

                </div>
            ))}
        </div>
    </Col>
);

const ContactsCol = ({locale}) => (
    <Col xs="6" md="" className="footer__col">
        <div className="footer__nav-list">
            <h4 className="footer__col-title">{footer.text_title_contacts[locale]}</h4>
            <a href={constants.mail_href} className="footer__a footer__text footer__text_color">
                {constants.mail}
            </a>
            <a href={constants.tel_href} className="footer__a footer__text footer__text_color">
                {constants.tel}
            </a>
        </div>
    </Col>
);

const SocialCol = ({locale}) => (
    <Col xs="6" md="" className="footer__col">
        <div className="footer__nav-list">
            <h4 className="footer__col-title">{footer.text_title_follow[locale]}</h4>
                <a className="footer__a footer__text footer__text_color"
                   href={constants.link_vk}
                   target="_blank">
                    {footer.follow_vk[locale]}
                </a>
                <a className="footer__a footer__text footer__text_color"
                   href={constants.link_instagram}
                   target="_blank">
                    {footer.follow_instagram[locale]}
                </a>
        </div>
    </Col>
);

const PrivacyCol = ({linkName, title, toggleFunc}) => (
    <Col xs="6" md="" className="footer__col">
        <div className="footer__nav-list">
            <h4 className="footer__col-title">{title}</h4>
            <span
              className="footer__a footer__text footer__text_color"
              onClick={toggleFunc}>
                {linkName}
            </span>
        </div>
    </Col>
);

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            showPolicy: false,
        };
    }

    toggle() {
        this.setState({
            showPolicy: !this.state.showPolicy,
        });
    };

    render() {
        const locale = getLocale();
        return (
          <div className="footer__background-color">
              <Container fluid className="footer">
                  <Row noGutters>
                      <Col xs="12" lg="" className="footer__col">
                          <AnchorLink href="#top">
                              <img
                                className="footer__img"
                                src={footer.logoSrc}
                                alt="SITE - Logo"/>
                          </AnchorLink>
                          <div className="footer__slogan footer__text">
                              {footer.slogan}
                          </div>
                      </Col>
                      <MapCol title={footer.text_title_menu[locale]} list={pages.navs} locale={locale}/>
                      <ContactsCol locale={locale}/>
                      <SocialCol locale={locale}/>
                      <PrivacyCol
                        title={footer.text_title_legal[locale]}
                        linkName={footer.policy[locale]}
                        toggleFunc={this.toggle}/>
                  </Row>
                  <Row noGutters>
                      <Col>
                          <div className="footer__all-rights footer__text">
                              {footer.rights}
                          </div>
                      </Col>
                  </Row>
              </Container>
              {this.state.showPolicy ?
                <Policy toggle={this.toggle.bind(this)}/>
                : <div/>
              }
          </div>
        );
    }
}

export default Footer;
