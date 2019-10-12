/**
 *
 * LocaleToggleMobile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const ToggleMobile = (props) => {
  let content;

  // If we have items, render them
  if (props.values) {
    content = props.values.map((value, index) => {
      return (
        <div key={value}>
          <button className={props.value === value
            ? "toggle-mobile__button toggle-mobile__lang_active"
            : "toggle-mobile__button"}
                  value={value}
                  onClick={props.onToggle}>
            {value}
          </button>
          <span>{index === props.values.length - 1 ? '' : ' / '}</span>
        </div>
      );
    });
  }

  return (
    <div className="toggle-mobile__wrap">
      {content}
    </div>
  )
};
ToggleMobile.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
};

export default ToggleMobile;
