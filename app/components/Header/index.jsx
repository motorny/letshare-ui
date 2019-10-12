import React from 'react';
import { withRouter } from 'react-router-dom';
import { HashLink as Link, NavHashLink as NavLink } from 'react-router-hash-link';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import styled from 'styled-components';

import LocaleToggle from '../../containers/LocaleToggle';
import NavToggler from '../NavToggler';
import Popup from './popup';
import { getLocale } from "../../cookieManager";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import constants from '../../mockups/constants.json';
import SearchField from "../SearchField";

const ArrowToTop = styled.div`
    opacity: ${props => (props.isScrolled ? "1" : "0")}
`;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.checkPopup = this.checkPopup.bind(this);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);

        const isScrolled = window.scrollY > 0;
        this.state = {
            isScrolled: isScrolled,
            isOpen: false,
        }
    };

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent);
        window.addEventListener('resize', this.checkPopup)
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent, false);
        window.removeEventListener('resize', this.checkPopup, false);
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    listenScrollEvent = () => {
        if (window.scrollY > 0 !== this.state.isScrolled) {
            this.setState({isScrolled: window.scrollY > 0})
        }
    };

    checkPopup = () => {
        if (window.innerWidth >= 991 && this.state.isOpen) {
            this.setState({
                isOpen: false,
            });
        }
    };

    render() {
        const locale = getLocale();
        const headerNavClass = this.state.isScrolled
            ? "header__navbar header__scroll header__text_font"
            : "header__navbar header__text_font";

        return (
            <div className="header">
                <Navbar className={headerNavClass} expand="xl">
                    <Link to='/#top' className="header__logo_link">
                        <img src="/logo.svg" alt="SITE - Logo" className="header__img"/>
                    </Link>
                    <div className="header__collapse">
                        <SearchField/>
                        <div className="header__right-side">

                            <div className="header__icon_wrap">
                                <Link to='/requests'>
                                    <i className="fas fa-bell header__icon"/>
                                </Link>
                            </div>

                            {/*<LocaleToggle mobile={false}/>*/}
                        </div>
                    </div>
                    <div className="header__right">
                        <div className="header__collapse_mobile">


                        </div>
                        <NavToggler isOpen={this.state.isOpen} headerPtr={this}/>
                    </div>
                </Navbar>
                <Collapse isOpen={this.state.isOpen} className="header__popup">
                    <Popup locale={locale} toggle={this.toggle}/>
                </Collapse>
                <AnchorLink href="#top">
                    <ArrowToTop isScrolled={this.state.isScrolled} className="header__arrow">
                        <i className="fas fa-chevron-up header__chevron"/>
                    </ArrowToTop>
                </AnchorLink>
            </div>
        );
    }
}

export default withRouter(Header);
