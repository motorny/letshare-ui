import React from 'react';
import { Container, NavItem } from 'reactstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';

import LocaleToggle from '../../containers/LocaleToggle';

const Popup = (props) => {
  return(
    <Container>
      {props.navs.map(el => (
        <NavItem className="header__popup_nav-item" key={el.linkName[props.locale]}>
          {window.location.pathname === '/'
            ?
            <AnchorLink
              offset={() => 90}
              className="header__popup_link header__text_font"
              onClick={props.toggle}
              href={el.link}>
              {el.linkName[props.locale]}
            </AnchorLink>
            :
            <NavLink
              className="header__popup_link header__text_font"
              onClick={props.toggle}
              to={'/' + el.link}>
              {el.linkName[props.locale]}
            </NavLink>
          }
        </NavItem>
      ))}
      <NavItem className="header__popup_nav-item">
        <span className="header__popup_toggle header__text_font">
          <LocaleToggle mobile={true}/>
        </span>
      </NavItem>
    </Container>
  )
};
Popup.propTypes = {
  locale: PropTypes.string,
  navs: PropTypes.array,
  toggle: PropTypes.func
};

export default Popup;