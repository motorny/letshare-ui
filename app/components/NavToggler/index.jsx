import React from 'react';
import PropTypes from "prop-types";

import './index.css';

const NavToggler = (props) => {
    const animatedIcon = props.isOpen ? "nav-toggler__icon open" : "nav-toggler__icon";
    return (
      <button
        className="navbar-toggler nav-toggler"
        onClick={props.headerPtr.toggle}
        type="button"
        data-toggle="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <div className={animatedIcon}><span/><span/><span/><span/></div>
      </button>
    );
};
NavToggler.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    headerPtr: PropTypes.object.isRequired,
};


export default NavToggler;
