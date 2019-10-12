import React, { useState } from 'react';
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
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
        this.toggle_dropDown = this.toggle_dropDown.bind(this);
        this.checkPopup = this.checkPopup.bind(this);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);

        const isScrolled = window.scrollY > 0;
        this.state = {
            isScrolled: isScrolled,
            isOpen: false,
            dropDown: false
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

    toggle_dropDown() {
        this.setState({
            dropDown: !this.state.dropDown
        })
    }

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

                            <ButtonDropdown isOpen={this.state.dropDown} toggle={this.toggle_dropDown}>
                                <DropdownToggle caret>
                                    <img className="header__user_logo" src="http://ankom.ru/wp-content/uploads/Kabel-HDMI-HDMI-5m..jpg" alt="logo"/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Мои вещи</DropdownItem>
                                    <DropdownItem>Профиль</DropdownItem>
                                    <DropdownItem>Выйти</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>

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
