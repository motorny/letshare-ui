/**
 *
 * LocaleToggleMobile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

class ToggleMobile extends React.Component {
    render() {
        let content;

        // If we have items, render them
        if (this.props.values) {
            content = this.props.values.map((value, index) => {
                return (
                    <div key={value}>
                        <button className={this.props.value === value
                                    ? "toggle-mobile__button toggle-mobile__lang_active"
                                    : "toggle-mobile__button"}
                                value={value}
                                onClick={this.props.onToggle}>
                            {value}
                        </button>
                        <span>{index === this.props.values.length - 1 ? '' : ' / '}</span>
                    </div>
                );
            });
        }

        return (
            <div className="toggle-mobile__wrap">
                {content}
            </div>
        )
    }
}

ToggleMobile.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  // messages: PropTypes.object,
};

export default ToggleMobile;
