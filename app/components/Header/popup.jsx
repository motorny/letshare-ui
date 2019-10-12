import React from 'react';
import { Container, NavItem } from 'reactstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';

import LocaleToggle from '../../containers/LocaleToggle';

const Popup = (props) => {
  return(
    <Container>

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