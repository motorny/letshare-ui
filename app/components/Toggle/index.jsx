/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const lefts = {
    'EN': '6px',
    'RU': '42px',
};

const setBorderPosition = (elem, border, event) => {
    let x = event.pageX;
    const m = 10;
    const rect = elem.getBoundingClientRect();
    if(x - rect.left > 31) {
        x = 62 - m;
    }
    else {
        x = 6 + m;
    }
    
    const l = x - m;
    border.style.left = l+'px';
};

const returnBorderPosition = (value, border) => {
    border.style.left = lefts[value];
};

class Toggle extends React.Component {
    render() {
        let content;

        // If we have items, render them
        if (this.props.values) {
            content = this.props.values.map((value, index) => {
                return (
                    <div className="toggle__language" key={value}>
                        <button
                            className="toggle__button"
                            value={value}
                            onClick={this.props.onToggle}>{value}
                        </button>
                        <span>{index === this.props.values.length - 1 ? '' : '/'}</span>
                    </div>
                );
            });
        }
        return (
            <div className="toggle__wrap" ref={div => this.toggle_wrap = div}>
                <div className="toggle__flex"
                     onMouseMove={e => setBorderPosition(this.toggle_wrap, this.toggle_border, e)}
                     onMouseLeave={() => returnBorderPosition(this.props.value, this.toggle_border)}>
                    {content}
                </div>
                <div className="toggle__border"
                     style={{left: lefts[this.props.value]}}
                     ref={div => this.toggle_border = div}/>
            </div>
        )
    }
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
};

export default Toggle;
